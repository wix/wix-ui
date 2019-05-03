import chalk from 'chalk';
const logger = require('./logger');

import { Options } from './Options';

export const runTasks: (a: Options) => Promise<undefined> = options => {
  const tasks = [
    {
      // requires are put here for a reason, it is to delay code execution until needed. That's because one task
      // might change files that another task relies on. If all files are required beforehand, consecutive tasks will
      // not see file changes and thus, component generation becomes falsy
      task: () => require('./tasks/verify-working-directory'),
      skipped: options.force,
      message: 'Verify clean working directory',
    },
    {
      task: () => require('./tasks/copy-templates'),
      message: 'Copy templates',
    },
    {
      task: () => require('./tasks/run-codemods'),
      message: 'Run codemods',
      skipped: options.skipCodemods,
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
