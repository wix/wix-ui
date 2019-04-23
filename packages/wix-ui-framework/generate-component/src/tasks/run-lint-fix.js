const path = require('path');
const { exec } = require('child_process');

const utils = require('../utils');

const runLintFix = glob => {
  return new Promise(resolve => {
    const pathToExecutable = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'node_modules',
      '.bin',
      'yoshi',
    );

    const execProc = exec(`yoshi lint --fix ${glob}`);

    execProc.on('exit', resolve);
  });
};

module.exports = async ({ answers: { ComponentName } = {} }) =>
  await runLintFix(
    `${utils.getComponentPath(ComponentName)}/* ${utils.getComponentStoryPath(
      ComponentName,
    )}/*`,
  );
