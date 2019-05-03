import * as path from 'path';

import { Options } from './Options';
import { runTasks } from './run-tasks';
import { runPrompts } from './tasks/run-prompts';

const cwd = process.cwd();

const defaultTemplatesPath = 'generator/templates';
const defaultCodemodsPath = 'generator/codemods';

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
