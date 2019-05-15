import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import { diff } from 'deep-diff';

import { Path, Process } from '../../typings.d';
import { fileExists } from '../../file-exists';
import { fsToJson } from '../../fs-to-json';
import { mapTree } from '../../map-tree';

const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

const pathResolver = cwd => (...a) => path.resolve(cwd, ...a);

interface Options {
  shape?: Path;
  components?: Path;
  output?: Path;
  maxMismatch?: number;
  _process: Process;
}

/*
1. read template json
2. fs-to-json start path
3. iterate src json
4. rename template to iteratee name
5. diff according to maxDiff setting
6. write json to output
*/

export const updateComponentsList: (
  a: Options,
) => Promise<void> = async opts => {
  const pathResolve = pathResolver(opts._process.cwd);

  const options = {
    shape: pathResolve(opts.shape || '.wuf/required-component-files.json'),
    components: pathResolve(opts.components || 'src/components'),
    output: pathResolve(opts.output || '.wuf/components.json'),
    maxMismatch: opts.maxMismatch || 0,
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

  const analyzedComponents = Object.keys(componentsFs)
    .map(name => ({
      name,
      structure: componentsFs[name],
    }))

    // skip non folders at root level
    .filter(({ structure }) => structure !== '')

    .map(({ name, structure }) => {
      const replaceName = 'Component';

      const namedShape = mapTree(shape, ({ key, value }) => {
        const basename = path.basename(key);
        const match = basename.match(new RegExp(`^${replaceName}\\.(.*)`));

        if (match) {
          return { [`${name}.${match[1]}`]: value };
        }
      });

      const diffs = (diff(namedShape, structure) || []).filter(
        ({ kind }) => kind === 'D',
      );

      const missingFiles = diffs.reduce((files, d) => {
        const rootPath = d.path.join('/');
        files.push(rootPath);

        if (d.lhs) {
          files.push(...Object.keys(d.lhs).map(p => [rootPath, p].join('/')));
        }

        return files;
      }, []);

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

  // TODO: consider logging out folders that didn't match the criteria, maybe under --verbose flag
  /* const nonComponents = analyzedComponents.filter( */
  /* ({ missingFiles }) => missingFiles.length > 0, */
  /* ); */

  const output = goodComponents.reduce((components, component) => {
    components[component.name] = {
      path: component.path,
      missingFiles: component.missingFiles,
    };
    return components;
  }, {});

  await fsWriteFile(options.output, JSON.stringify(output, null, 2));
};
