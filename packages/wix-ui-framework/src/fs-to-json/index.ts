import * as fs from 'fs';
import { promisify } from 'util';
import { resolve as pathResolve } from 'path';
import { fileExists } from '../file-exists';

interface Params {
  cwd: string;
  path: string;
  options?: {
    withContent?: boolean;
  };
}

const fsReaddir = promisify(fs.readdir);
const fsReadFile = promisify(fs.readFile);
const fsStat = promisify(fs.stat);

export const fsToJson: (a: Params) => Promise<object> = async ({
  cwd,
  path,
  options = {},
}) => {
  const realPath = pathResolve(cwd, path);
  if (!(await fileExists(realPath))) {
    throw new Error(`ERROR: File does not exist at ${realPath}`);
  }

  const recursion = ({ entries, entryCwd }) =>
    entries.reduce(
      (accPromise: Promise<object>, entry: string) =>
        accPromise.then(async acc => {
          const entryPath = pathResolve(entryCwd, entry);
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
                [entry]: options.withContent
                  ? await fsReadFile(entryPath, 'utf8')
                  : '',
              };
        }),
      Promise.resolve({}),
    );

  return recursion({
    entries: await fsReaddir(pathResolve(cwd, path)),
    entryCwd: cwd,
  });
};
