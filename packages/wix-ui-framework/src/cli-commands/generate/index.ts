import * as path from 'path';

import { Options } from './typings';
import { Process } from '../../typings';
import { runTasks } from './run-tasks';
import { runPrompts } from './tasks/run-prompts';

const defaultTemplatesPath = '.wuf/generator/templates';
const defaultCodemodsPath = '.wuf/generator/codemods';

export const generate: (
  a: Options & { componentName: string; _process: Process },
) => Promise<void> = ({
  _process,
  force,
  componentName,
  description,
  templates,
  output,
  codemods,
}) => {
  try {
    require(path.join(_process.cwd, 'package.json'));
  } catch (e) {
    return Promise.reject(
      'ERROR: `wuf generate` must be run at root of the module (where package.json exists).',
    );
  }

  const options: Options = {
    cwd: _process.cwd,

    // componentName variable comes in as camelCase but its value is PascalCase, therefore we rename it
    ComponentName: componentName,
    description,
    templates: path.join(_process.cwd, templates || defaultTemplatesPath),
    codemods: path.join(_process.cwd, codemods || defaultCodemodsPath),
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
