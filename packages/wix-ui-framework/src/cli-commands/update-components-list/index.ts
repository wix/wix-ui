import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import * as minimatch from 'minimatch';

import { Path, Process } from '../../typings.d';
import { fileExists } from '../../file-exists';
import { objectEntries } from '../../object-entries';
import { fsToJson } from '../../fs-to-json';
import { mapTree } from '../../map-tree';

const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

const pathResolver = (cwd) => (...a) => path.resolve(cwd, ...a);

interface Options {
  shape?: Path;
  components?: Path;
  output?: Path;
  maxMismatch?: number;
  exclude?: string;
  _process: Process;
}

const readOutputFile = async (path = '') => {
  try {
    const outputRaw = await fsReadFile(path, 'utf8');
    return JSON.parse(outputRaw);
  } catch (e) {
    return {};
  }
};

const guards: (a: Options) => Promise<void> = async (unsafeOptions) => {
  const pathResolve = pathResolver(unsafeOptions._process.cwd);

  const options = {
    ...unsafeOptions,
    shape: pathResolve(
      unsafeOptions.shape || '.wuf/required-component-files.json',
    ),
    components: pathResolve(unsafeOptions.components || 'src/components'),
    output: pathResolve(unsafeOptions.output || '.wuf/components.json'),
    maxMismatch: unsafeOptions.maxMismatch || 0,
    exclude: unsafeOptions.exclude,
  };

  if (!(await fileExists(options.shape))) {
    throw new Error(
      `Component structure file does not exist at "${
        unsafeOptions.shape || options.shape
      }"`,
    );
  }

  if (!(await fileExists(options.components))) {
    throw new Error(
      `Cannot read components folder at "${unsafeOptions.components}"`,
    );
  }

  return makeOutput(options);
};

const makeOutput: (a: Options) => Promise<void> = async (options) => {
  const shapeRaw = await fsReadFile(options.shape, 'utf8');
  const shape = JSON.parse(shapeRaw);
  const output = await readOutputFile(options.output);

  const componentsFs = await fsToJson({
    cwd: options.components,
    path: '.',
  });

  const analyzedComponents = objectEntries(componentsFs)
    .filter(([name, structure]) =>
      [
        // skip non folders at root level
        structure !== '',

        // skip excluded
        options.exclude ? !new RegExp(options.exclude).test(name) : true,
      ].every(Boolean),
    )

    .map(([name, structure]) => {
      // TODO: this should be a placeholder coming from config. There should be support for multiple
      const replaceableName = 'Component';

      const namedShape = mapTree(shape, ({ key, value }) => ({
        [key.replace(replaceableName, name)]: value,
      }));

      const missingFiles = [];

      const traverseGlobs = ({ globTree, fsTree, fsPath = '' }) => {
        const globEntries = objectEntries(globTree);
        const fsEntries = objectEntries(fsTree);

        return globEntries.reduce((row, [globPath, globValue]) => {
          const matchingFsEntries = fsEntries.filter(([entry]) =>
            minimatch(entry, globPath),
          );

          if (!matchingFsEntries.length) {
            missingFiles.push(path.join(fsPath.replace(/^\//, ''), globPath));
          }

          matchingFsEntries.map(([matchingFsPath, matchingFsValue]) => {
            if (typeof matchingFsValue !== 'string') {
              row[matchingFsPath] = traverseGlobs({
                fsTree: matchingFsValue,
                globTree: globValue,
                fsPath: `${fsPath}/${matchingFsPath}`,
              });
            } else {
              row[matchingFsPath] = matchingFsValue;
            }
          });

          return row;
        }, {});
      };

      traverseGlobs({
        globTree: namedShape,
        fsTree: structure,
      });

      return {
        name,
        structure,
        missingFiles,
        path: path.relative(
          options._process.cwd,
          path.resolve(options.components, name),
        ),
      };
    });

  const goodComponents = analyzedComponents.filter(
    ({ missingFiles }) => missingFiles.length <= options.maxMismatch,
  );

  const newOutput = goodComponents.reduce((components, component) => {
    components[component.name] = {
      path: component.path,
      ...(component.missingFiles.length
        ? { missingFiles: component.missingFiles }
        : {}),
    };
    return components;
  }, output);

  await fsWriteFile(options.output, JSON.stringify(newOutput, null, 2));
};

export const updateComponentsList: (a: Options) => Promise<void> = guards;
