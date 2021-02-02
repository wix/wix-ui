import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import kebabCase from 'lodash/kebabCase';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

import { Options } from '../typings';
import { replaceTemplates } from './replace-templates';
import { createValuesMap } from '../create-values-map';
import { interpolateFileName } from '../interpolate-file-name';

const pathExists = (p: string) =>
  new Promise((resolve) => {
    fs.access(p, fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });

export const copyTemplates = async ({
  templates,
  ComponentName,
  description,
  _process,
  output = '',
}: Options): Promise<void> => {
  if (!ComponentName) {
    throw new Error('Component name must be provided!');
  }

  const readdir = (entry: string) =>
    fs.readdirSync(entry).map((dir) => path.join(entry, dir));

  const componentNames = {
    ComponentName,
    componentName: camelCase(ComponentName),
    'component-name': kebabCase(ComponentName),
    component_name: snakeCase(ComponentName),
  };

  const queue = readdir(templates);

  while (queue.length) {
    const itemPath = queue.shift();

    const isDir = fs.lstatSync(itemPath).isDirectory();

    const renamedDestPath = interpolateFileName({
      filename: path.join(
        _process.cwd,
        output,
        itemPath.replace(templates, ''),
      ),
      names: componentNames,
    });

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
