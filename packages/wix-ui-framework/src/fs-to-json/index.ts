import fs from 'fs';
import { promisify } from 'util';
import { resolve as pathResolve } from 'path';
import minimatch from 'minimatch';

import { fileExists } from '../file-exists';

interface Params {
  cwd: string;
  path: string;
  withContent?: boolean;
  exclude?: string[];
}

const fsReaddir = promisify(fs.readdir);
const fsReadFile = promisify(fs.readFile);
const fsStat = promisify(fs.stat);

export const fsToJson: (a: Params) => Promise<Object> = async ({
  cwd,
  path,
  withContent = false,
  exclude = [],
}) => {
  const realPath = pathResolve(cwd, path);
  if (!(await fileExists(realPath))) {
    throw new Error(`ERROR: File does not exist at ${realPath}`);
  }

  const recursion = ({ entries, entryCwd }) =>
    entries.reduce(
      (accPromise: Promise<Object>, entry: string) =>
        accPromise.then(async (acc) => {
          const entryPath = pathResolve(entryCwd, entry);

          if (exclude.some((glob) => minimatch(entryPath, glob))) {
            return acc;
          }

          const entryStats = await fsStat(entryPath);

          return entryStats.isDirectory()
            ? {
                ...acc,
                [entry]: await recursion({
                  entries: await fsReaddir(entryPath),
                  entryCwd: entryPath,
                }),
              }
            : {
                ...acc,
                [entry]: withContent ? await fsReadFile(entryPath, 'utf8') : '',
              };
        }),
      Promise.resolve({}),
    );

  return recursion({
    entries: await fsReaddir(pathResolve(cwd, path)),
    entryCwd: cwd,
  });
};
