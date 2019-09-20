import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as kebabCase from 'lodash/kebabCase';

import { Options } from '../typings';
import { objectEntries } from '../../../object-entries';
import { replaceTemplates } from './replace-templates';

import { createValuesMap } from '../create-values-map';

const sameName = i => i;

const componentReplaceMap = {
  Component: sameName,
  ComponentName: sameName,
  'component-name': kebabCase,
};

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

    const originalDestPath = path.join(
      _process.cwd,
      output,
      itemPath.replace(templates, ''),
    );

    const renamedDestPath = objectEntries(componentReplaceMap).reduce(
      (output, [name, replaceFn]) =>
        output.replace(new RegExp(name, 'g'), () => replaceFn(ComponentName)),
      originalDestPath,
    );

    if (isDir) {
      queue.push(...readdir(path.join(itemPath)));

      if (!(await pathExists(renamedDestPath))) {
        mkdirp.sync(renamedDestPath);
      }
    } else if (!(await pathExists(renamedDestPath))) {
      const replaced = replaceTemplates(
        fs.readFileSync(itemPath, 'utf8'),
        createValuesMap({ ComponentName, description }),
      );

      fs.writeFileSync(renamedDestPath, replaced, 'utf8');
    }
  }
};
