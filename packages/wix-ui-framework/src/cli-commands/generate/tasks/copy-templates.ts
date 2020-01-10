import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as kebabCase from 'lodash/kebabCase';
import * as camelCase from 'lodash/camelCase';
import * as snakeCase from 'lodash/snakeCase';

import { Options } from '../typings';
import { replaceTemplates } from './replace-templates';
import { createValuesMap } from '../create-values-map';

const interpolateFileName = ({ filename, names }): string => {
  const newInterpolations = [
    [/\$ComponentName/, names.ComponentName],
    [/\$componentName/, names.componentName],
    [/\$component-name/, names['component-name']],
    [/\$component_name/, names.component_name],
  ];

  const oldInterpolations = [
    // DEPRECATED: the following should no longer be used!
    // keeping them to not break existing users
    // can be removed either:
    // 1. with major version release
    // 2. when ensured no consumers use it
    [/Component/, names.ComponentName],
    [/ComponentName/, names.ComponentName],
    [/component-name/, names['component-name']],
  ];

  const matchesNewInterpolations = newInterpolations.some(([regexp]) =>
    new RegExp(regexp, 'g').test(filename),
  );

  const interpolations = matchesNewInterpolations
    ? newInterpolations
    : oldInterpolations;

  return interpolations.reduce(
    (name, [regex, replace]) => name.replace(new RegExp(regex, 'g'), replace),
    filename,
  );
};

const pathExists = p =>
  new Promise(resolve => {
    fs.access(p, fs.constants.F_OK, err => {
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
    fs.readdirSync(entry).map(dir => path.join(entry, dir));

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
