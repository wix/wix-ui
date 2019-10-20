import * as path from 'path';
import * as minimatch from 'minimatch';

import { objectEntries } from '../../object-entries';
import { mapTree } from '../../map-tree';

interface TreeObject {
  [k: string]: {};
}

interface Input {
  tree?: TreeObject;
  glob?: TreeObject;
  treePath?: string;
}

interface Output extends TreeObject {}

const isString = (a: unknown) => typeof a === 'string';
const isUndefined = (a: unknown) => typeof a === 'undefined';
const treeHasMatches = (matches: TreeObject) => Object.keys(matches).length;

// TODO: this should be a placeholder coming from config. There should be support for multiple
const replaceableName = 'Component';

const renameGlob = ({ glob, name }) =>
  mapTree(glob, ({ key, value }) => ({
    [key.replace(replaceableName, name)]: value,
  }));

export const match: (a?: Input) => Output = (input = {}) => {
  if (isUndefined(input.tree) || isUndefined(input.glob)) {
    return {};
  }

  const { tree, glob } = input;
  const globEntries = objectEntries(glob);
  const treeEntries = objectEntries(tree);
  const output = {};
  let matching = true;

  treeLoop: for (const [treeKey, treeValue] of treeEntries) {
    if (globEntries.length > treeEntries.length) {
      matching = false;
    }

    globLoop: for (const [globKey, globValue] of globEntries) {
      if (!matching) {
        break globLoop;
      }

      if (typeof treeValue !== typeof globValue) {
        continue globLoop;
      }

      if (minimatch(treeKey, globKey)) {
        if (isString(treeValue) && isString(globValue)) {
          output[treeKey] = {};
          continue treeLoop;
        }

        if (!isString(treeValue) && !isString(globValue)) {
          const matches = match({
            tree: treeValue as TreeObject,
            glob: globValue as TreeObject,
          });

          if (matches) {
            output[treeKey] = matches;
            continue treeLoop;
          }
          matching = false;
        }
      }
    }
  }

  if (objectEntries(output).length < objectEntries(glob).length) {
    matching = false;
  }

  return matching ? output : null;
};

export const matchComponent = ({ tree, glob, treePath = '', name }) => {
  const treeEntries = objectEntries(tree);
  const output = {};

  treeEntries.map(([treeKey, treeValue]) => {
    const renamedGlob = renameGlob({ glob, name: treeKey });
    const matches = match({
      tree: treeValue as TreeObject,
      glob: renamedGlob,
    });

    if (matches) {
      const childPath = path.join(treePath, treeKey);

      const children = matchComponent({
        tree: treeValue,
        glob: renamedGlob,
        treePath: childPath,
        name,
      });

      output[treeKey] = {
        path: childPath,
        ...(treeHasMatches(children) ? { children } : {}),
      };
    }
  });

  return output;
};
