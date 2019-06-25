import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import * as minimatch from 'minimatch';

import { Path, Process } from '../../typings.d';
import { fileExists } from '../../file-exists';
import { fsToJson } from '../../fs-to-json';
import { mapTree } from '../../map-tree';

const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

const pathResolver = cwd => (...a) => path.resolve(cwd, ...a);

const objectEntries = object =>
  Object.keys(object).map(key => [key, object[key]]);

interface Options {
  shape?: Path;
  components?: Path;
  output?: Path;
  maxMismatch?: number;
  exclude?: string;
  _process: Process;
}

export const updateComponentsList: (
  a: Options,
) => Promise<void> = async opts => {
  const pathResolve = pathResolver(opts._process.cwd);

  const options = {
    shape: pathResolve(opts.shape || '.wuf/required-component-files.json'),
    components: pathResolve(opts.components || 'src/components'),
    output: pathResolve(opts.output || '.wuf/components.json'),
    maxMismatch: opts.maxMismatch || 0,
    exclude: opts.exclude,
  };

  if (!(await fileExists(options.shape))) {
    throw new Error(
      `Component structure file does not exist at "${opts.shape ||
        options.shape}"`,
    );
  }

  if (!(await fileExists(options.components))) {
    throw new Error(`Cannot read components folder at "${opts.components}"`);
  }

  const shapeRaw = await fsReadFile(options.shape, 'utf8');
  const shape = JSON.parse(shapeRaw);

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
        opts.exclude ? !new RegExp(opts.exclude).test(name) : true,
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
          opts._process.cwd,
          path.resolve(options.components, name),
        ),
      };
    });

  const goodComponents = analyzedComponents.filter(
    ({ missingFiles }) => missingFiles.length <= options.maxMismatch,
  );

  const output = goodComponents.reduce((components, component) => {
    components[component.name] = {
      path: component.path,
      ...(component.missingFiles.length
        ? { missingFiles: component.missingFiles }
        : {}),
    };
    return components;
  }, {});

  await fsWriteFile(options.output, JSON.stringify(output, null, 2));
};
