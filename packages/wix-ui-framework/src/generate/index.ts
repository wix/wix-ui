const cwd = process.cwd();
const path = require('path');

import { runTasks } from './run-tasks';
const runPrompts = require('./tasks/run-prompts');

const defaultTemplatesPath = 'generator/templates';
const defaultCodemodsPath = 'generator/codemods';

import { Options } from './Options';

export const generate = ({
  force,
  ComponentName,
  description,
  templates,
  codemods,
}) => {
  try {
    require(path.join(cwd, 'package.json'));
  } catch (e) {
    return Promise.reject(
      'ERROR: `wuf generate` must be run at root of the module (where package.json exists).',
    );
  }

  const options: Options = {
    cwd,
    ComponentName,
    description,
    templatesPath: path.join(cwd, templates || defaultTemplatesPath),
    codemodsPath: path.join(cwd, codemods || defaultCodemodsPath),
    force,
    skipCodemods: false,
  };

  if (options.ComponentName) {
    return runTasks(options);
  }

  return runPrompts().then(answers =>
    runTasks({
      ...options,
      ...answers,
    }),
  );
};
