import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const fsMkdir = promisify(fs.mkdir);
const fsWriteFile = promisify(fs.writeFile);

type Queue = {
  type: 'files' | 'up' | 'down';
  entry?: [string, unknown];
  name?: string;
}[];

export const jsonToFs = async ({ tree = {}, cwd }) => {
  if (!cwd) {
    return Promise.reject('jsonToFs expects `cwd` to be passed');
  }

  const makeQueue: (a: any) => Queue = (tree) =>
    Object.entries(tree).map((entry) => ({
      type: 'files',
      entry,
    }));

  let currentPath = cwd;
  const queue: Queue = makeQueue(tree);

  while (queue.length) {
    debugger;
    const current = queue.shift();
    if (current.type === 'files') {
      const [name, content] = current.entry;
      if (typeof content === 'string') {
        await fsWriteFile(path.join(currentPath, name), content, {
          encoding: 'utf8',
        });
      } else {
        queue.unshift({ type: 'down', name }, ...makeQueue(content), {
          type: 'up',
        });
      }
    }

    if (current.type === 'down') {
      currentPath = path.join(currentPath, current.name);
      await fsMkdir(currentPath);
    }

    if (current.type === 'up') {
      currentPath = path.dirname(currentPath);
    }
  }
};
