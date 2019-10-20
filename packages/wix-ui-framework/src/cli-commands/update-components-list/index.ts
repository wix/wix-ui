import * as path from 'path';
import * as fs from 'fs';
import * as minimatch from 'minimatch';

import { Path, Process } from '../../typings.d';
import { fileExists } from '../../file-exists';
import { objectEntries } from '../../object-entries';
import { fsToJson } from '../../fs-to-json';
import { mapTree } from '../../map-tree';
import { readJson } from './read-json';

interface Options {
  shape?: Path;
  components?: Path;
  output?: Path;
  maxMismatch?: number;
  exclude?: string;
  _process: Process;
}

interface TreeObject {
  [k: string]: {};
}

interface Input {
  tree?: TreeObject;
  glob?: TreeObject;
  treePath?: string;
}

const treeHasMatches = (matches: TreeObject) => Object.keys(matches).length;
const isString = (a: unknown) => typeof a === 'string';
const isUndefined = (a: unknown) => typeof a === 'undefined';
const head = (a: unknown[]) => a[0];

interface Output extends TreeObject {}

const guards: (a: Options) => Promise<void> = async unsafeOptions => {
  const pathResolve = (...a) => path.resolve(unsafeOptions._process.cwd, ...a);

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

      const match: (a?: Input) => Output = (input = {}) => {
        if (isUndefined(input.tree) || isUndefined(input.glob)) {
          return {};
        }

        const { tree, glob } = input;
        const globEntries = objectEntries(glob);
        const treeEntries = objectEntries(tree);
        const output = {};

        treeEntries.map(([treeKey, treeValue]) => {
          const matchingGlobEntries = globEntries.filter(([globKey]) =>
            minimatch(treeKey, globKey),
          );

          for (const [globKey, globValue] of matchingGlobEntries) {
            if (!isString(treeValue)) {
              const matches = match({
                tree: treeValue as TreeObject,
                glob: globValue as TreeObject,
              });

              if (treeHasMatches(matches)) {
                output[treeKey] = matches;
              }
            } else {
              const globKeys = globEntries.map(head);
              const treeKeys = treeEntries.map(head);
              if (
                treeEntries.length >= globEntries.length &&
                globKeys.every(globEntryKey =>
                  treeKeys.some(key =>
                    minimatch(key as string, globEntryKey as string),
                  ),
                )
              ) {
                output[treeKey] = {};
              }
            }
          }
        });

        return output;
      };

      const matchComponent = ({ tree, glob, treePath = '' }) => {
        const treeEntries = objectEntries(tree);
        const output = {};

        treeEntries.map(([treeKey, treeValue]) => {
          const matches = match({ tree: treeValue as TreeObject, glob });

          if (treeHasMatches(matches)) {
            const compound = matchComponent({
              tree: treeValue,
              glob,
              treePath: `${treePath}/${treeKey}`,
            });

            output[treeKey] = {
              ...(treeHasMatches(compound)
                ? { compound }
                : {
                    path: `${treePath}/${treeKey}`,
                  }),
            };
          }
        });

        return output;
      };

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
      ...(treeHasMatches(component.compound)
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
