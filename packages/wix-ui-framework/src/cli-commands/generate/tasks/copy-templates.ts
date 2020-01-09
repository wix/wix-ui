import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as kebabCase from 'lodash/kebabCase';
import * as camelCase from 'lodash/camelCase';
import * as snakeCase from 'lodash/snakeCase';

import { Options } from '../typings';
import { replaceTemplates } from './replace-templates';

import { createValuesMap } from '../create-values-map';

const includes = (a: string) => (b: string) => b.includes(a);

const variableInterpolationRules = [
  {
    match: includes('$ComponentName'),
    replace: ({ filename, variables }) =>
      filename.replace(/\$ComponentName/g, variables.ComponentName),
  },
  {
    match: includes('$componentName'),
    replace: ({ filename, variables }) =>
      filename.replace(/\$componentName/g, camelCase(variables.ComponentName)),
  },
  {
    match: includes('$component-name'),
    replace: ({ filename, variables }) =>
      filename.replace(/\$component-name/g, kebabCase(variables.ComponentName)),
  },
  {
    match: includes('$component_name'),
    replace: ({ filename, variables }) =>
      filename.replace(/\$component_name/g, snakeCase(variables.ComponentName)),
  },

  // DEPRECATED: the following should no longer be used!
  // can be removed either:
  // 1. with major version release
  // 2. when ensured no consumers use it
  {
    match: includes('Component'),
    replace: ({ filename, variables }) =>
      filename.replace(/Component/g, variables.ComponentName),
  },
  {
    match: includes('ComponentName'),
    replace: ({ filename, variables }) =>
      filename.replace(/ComponentName/g, variables.ComponentName),
  },
  {
    match: includes('component-name'),
    replace: ({ filename, variables }) =>
      filename.replace(/component-name/g, kebabCase(variables.ComponentName)),
  },

  // default
  { match: () => true, replace: ({ filename }) => filename },
];

const interpolateFileName = ({ filename, variables }): string => {
  const { replace } = variableInterpolationRules.find(({ match }) =>
    match(filename),
  );
  return replace({ filename, variables });
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

      variables: {
        ComponentName,
      },
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
