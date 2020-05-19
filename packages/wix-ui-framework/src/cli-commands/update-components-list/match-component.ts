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
  onMissing?: any;
  treePath?: string;
}

interface Output extends TreeObject {}

const isString = (a: unknown) => typeof a === 'string';
const isUndefined = (a: unknown) => typeof a === 'undefined';
const treeHasMatches = (matches: TreeObject) => Object.keys(matches).length;
const head: (a: string[]) => string = ([a]) => a;
const removeEntry = entries => entryKey =>
  entries.filter(([key]) => key !== entryKey);

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

  const { tree, glob, onMissing = () => {}, treePath = '' } = input;
  const globEntries = objectEntries(glob);
  const matchedGlobEntries = [];
  const treeEntries = objectEntries(tree);

  const state = {
    output: {},
    matching: true,
    missingFiles: [],
  };

  treeLoop: for (const [treeKey, treeValue] of treeEntries) {
    globLoop: for (const [globKey, globValue] of globEntries) {
      if (!state.matching) {
        break globLoop;
      }

      if (typeof treeValue !== typeof globValue) {
        continue globLoop;
      }

      if (minimatch(treeKey, globKey)) {
        if (isString(treeValue) && isString(globValue)) {
          state.output[treeKey] = {};
          matchedGlobEntries.push(globKey);
          continue treeLoop;
        }

        if (!isString(treeValue) && !isString(globValue)) {
          const matches = match({
            tree: treeValue as TreeObject,
            glob: globValue as TreeObject,
            treePath: treeKey,
          });

          if (matches) {
            state.output[treeKey] = matches;
            continue treeLoop;
          }

          state.matching = false;
        }
      }
    }
  }

  if (objectEntries(state.output).length < objectEntries(glob).length) {
    const outputEntriesKeys = objectEntries(state.output).map(head);

    const filtered = globEntries
      .map(head)
      .filter(key => !outputEntriesKeys.includes(key))
      .map((key: string) => path.join(treePath, key));

    onMissing(filtered);
    state.matching = false;
  }

  return state.matching ? state.output : null;
};

export const matchComponent = ({ tree, glob, treePath = '' }) => {
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
        glob: renameGlob({ glob, name: treeKey }),
        treePath: childPath,
      });

      output[treeKey] = {
        path: childPath,
        ...(treeHasMatches(children) ? { children } : {}),
      };
    }
  });

  return output;
};
