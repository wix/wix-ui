import chalk from 'chalk';
import * as logger from '../../logger';

import { Options } from './typings';

interface Task {
  task(): (a: Options) => Promise<void>;
  skipped?: boolean;
  message: string;
}

export const runTasks: (a: Options) => Promise<void> = options => {
  const tasks: Task[] = [
    {
      // requires are put here for a reason, it is to delay code execution until needed. That's because one task
      // might change files that another task relies on. If all files are required beforehand, consecutive tasks will
      // not see file changes and thus, component generation becomes falsy
      task: () =>
        require('./tasks/verify-working-directory').verifyWorkingDirectory,
      skipped: options.force,
      message: 'Verify clean working directory',
    },
    {
      task: () => require('./tasks/copy-templates').copyTemplates,
      message: 'Copy templates',
    },
    {
      task: () => require('./tasks/run-codemods').runCodemods,
      message: 'Run codemods',
      skipped: !options.codemods,
    },
  ];

  logger.info(
    `Generating ${chalk.cyan(`<${options.ComponentName}/>`)} component...`,
  );

  return tasks
    .filter(({ skipped }) => !skipped)

    .reduce(
      (promise, { task, message = '' }) =>
        promise.then(() => {
          const spinner = logger.spinner(message);

          return task()(options)
            .then(() => {
              spinner.stop();
              logger.success(`Done: ${message}`);
            })
            .catch(e => {
              spinner.stop();
              logger.error(`Failed: ${message} ${e}`);
              return Promise.resolve();
            });
        }),
      Promise.resolve(),
    )

    .then(() =>
      logger.success(
        `${chalk.cyan(`<${options.ComponentName}/>`)} generated successfully!`,
      ),
    )

    .catch(e => {
      logger.error(e);
      process.exit(1);
    });
};
