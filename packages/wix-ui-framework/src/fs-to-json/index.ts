import * as fs from 'fs';
import { promisify } from 'util';
import { resolve as pathResolve } from 'path';

interface Params {
  cwd: string;
  path: string;
  options?: {
    withContent?: boolean;
  };
}

const fsAccess = promisify(fs.access);
const fsReaddir = promisify(fs.readdir);
const fsReadFile = promisify(fs.readFile);
const fsStat = promisify(fs.stat);

const rejectNonExisting = fn => async params => {
  const realPath = pathResolve(params.cwd, params.path);

  try {
    await fsAccess(realPath, fs.constants.F_OK);
    return fn(params);
  } catch (e) {
    return Promise.reject(e);
  }
};

const fsToJsonUnguarded: (a: Params) => Promise<object> = async ({
  cwd,
  path,
  options = {},
}) => {
  const recursion = ({ entries, entryCwd }) =>
    entries.reduce(
      (accPromise, entry) =>
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

  const json = await recursion({
    entries: await fsReaddir(pathResolve(cwd, path)),
    entryCwd: cwd,
  });

  return Promise.resolve(json);
};

export const fsToJson = rejectNonExisting(fsToJsonUnguarded);
