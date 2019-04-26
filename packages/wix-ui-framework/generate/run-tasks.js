const chalk = require('chalk');
const logger = require('./logger');

module.exports = async options => {
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
      message: 'Fill templates',
      skipped: options.skipCodemods,
    },
  ];

  logger.info(
    `Generating ${chalk.cyan(
      `<${options.answers.ComponentName}/>`,
    )} component...`,
  );

  return tasks
    .filter(({ skipped }) => !skipped)
    .reduce(
      (promise, { task, message = '' }) =>
        promise.then(() => {
          const spinner = logger.spinner(message);

          return task()(options).then(() => {
            spinner.stop();
            logger.success(`Done: ${message}`);
          });
        }),
      Promise.resolve(),
    )
    .then(() =>
      logger.success(
        `${chalk.cyan(
          `<${options.answers.ComponentName}/>`,
        )} generated successfully!`,
      ),
    )
    .catch(e => {
      logger.error(e);
      process.exit(1);
    });
};
