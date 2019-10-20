import * as path from 'path';
import * as fs from 'fs';

import { Path, Process } from '../../typings.d';
import { fileExists } from '../../file-exists';
import { objectEntries } from '../../object-entries';
import { fsToJson } from '../../fs-to-json';
import { mapTree } from '../../map-tree';
import { readJson } from './read-json';
import { matchComponent } from './match-component';

interface Options {
  shape?: Path;
  components?: Path;
  output?: Path;
  maxMismatch?: number;
  exclude?: string;
  _process: Process;
}

const guards: (a: Options) => Promise<void> = async unsafeOptions => {
  const pathResolve = (...a: string[]) =>
    path.resolve(unsafeOptions._process.cwd, ...a);

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
      `Component structure file does not exist at "${unsafeOptions.shape ||
        options.shape}"`,
    );
  }

  if (!(await fileExists(options.components))) {
    throw new Error(
      `Cannot read components folder at "${unsafeOptions.components}"`,
    );
  }

  return makeOutput(options);
};

const excludeWrongFiles = (options: Options) => ([name, structure]) =>
  [
    // skip non folders at root level
    structure !== '',

    // skip excluded
    options.exclude ? !new RegExp(options.exclude).test(name) : true,
  ].every(Boolean);

const makeOutput: (a: Options) => Promise<void> = async options => {
  const shape = await readJson(options.shape);
  const output = await readJson(options.output);

  const componentsFs = await fsToJson({
    cwd: options.components,
    path: '.',
  });

  const analyzedComponents = objectEntries(componentsFs)
    .filter(excludeWrongFiles(options) as any)

    .map(([name, structure]) => {
      // TODO: this should be a placeholder coming from config. There should be support for multiple
      const replaceableName = 'Component';

      const namedGlobs = mapTree(shape, ({ key, value }) => ({
        [key.replace(replaceableName, name)]: value,
      }));

      const missingFiles = [];

      const compound = matchComponent({
        tree: structure,
        glob: namedGlobs,
        treePath: path.relative(
          options._process.cwd,
          path.resolve(options.components, name),
        ),
      });

      return {
        name,
        compound,
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
      ...(Object.keys(component.compound).length
        ? { compound: component.compound }
        : {}),
      ...(component.missingFiles.length
        ? { missingFiles: component.missingFiles }
        : {}),
    };
    return components;
  }, output);

  fs.writeFileSync(options.output, JSON.stringify(newOutput, null, 2));
};

export const updateComponentsList: (a: Options) => Promise<void> = guards;
