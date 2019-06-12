import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

import { Options } from '../typings';
import { replaceTemplates } from './replace-templates';

import { createValuesMap } from '../create-values-map';

const templateNamePlaceholder = 'Component';

const pathExists = p =>
  new Promise(resolve => {
    fs.access(p, fs.constants.F_OK, err => {
      resolve(!err);
    });
  });

export const copyTemplates: (a: Options) => Promise<void> = async ({
  templates,
  ComponentName,
  description,
  _process,
  output = '',
}) => {
  if (!ComponentName) {
    throw new Error('Component name must be provided!');
  }

  const readdir = (entry: string) =>
    fs.readdirSync(entry).map(dir => path.join(entry, dir));

  const queue = readdir(templates);

  while (queue.length) {
    const itemPath = queue.shift();

    const isDir = fs.lstatSync(itemPath).isDirectory();

    const newDestPath = path
      .join(_process.cwd, output, itemPath.replace(templates, ''))
      .replace(new RegExp(`${templateNamePlaceholder}`, 'g'), ComponentName);

    if (isDir) {
      queue.push(...readdir(path.join(itemPath)));

      if (!(await pathExists(newDestPath))) {
        mkdirp.sync(newDestPath);
      }
    } else if (!(await pathExists(newDestPath))) {
      const replaced = replaceTemplates(
        fs.readFileSync(itemPath, 'utf8'),
        createValuesMap({ ComponentName, description }),
      );

      fs.writeFileSync(newDestPath, replaced, 'utf8');
    }
  }
};
