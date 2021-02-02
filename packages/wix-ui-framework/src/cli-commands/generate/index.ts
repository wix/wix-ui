import path from 'path';

import { Options } from './typings';
import { runTasks } from './run-tasks';
import { runPrompts } from './tasks/run-prompts';

const defaultTemplatesPath = '.wuf/generator/templates';

export const generate: (
  a: Options & { componentName: string },
) => Promise<void> = (opts) => {
  try {
    require(path.join(opts._process.cwd, 'package.json'));
  } catch (e) {
    return Promise.reject(
      'ERROR: `wuf generate` must be run at root of the module (where package.json exists).',
    );
  }

  const options: Options = {
    // componentName variable comes in as camelCase but its value is PascalCase, therefore we rename it
    ComponentName: opts.componentName,
    templates: path.join(
      opts._process.cwd,
      opts.templates || defaultTemplatesPath,
    ),
    codemods: opts.codemods ? path.join(opts._process.cwd, opts.codemods) : '',
    output: opts.output ? path.join(opts._process.cwd, opts.output) : '',
    ...opts,
  };

  if (options.ComponentName) {
    return runTasks(options);
  }

  return runPrompts().then((answers) =>
    runTasks({
      ...options,
      ...answers,
    }),
  );
};
