const path = require('path');
const { exec } = require('child_process');

const logger = require('../logger');
const createValuesMap = require('../create-values-map');

const runCodemod = ({
  codemodsPath,
  codemod,
  dist,
  description,
  cwd,
  ComponentName,
  componentName,
}) => {
  return new Promise((resolve, reject) => {
    const codemodPath = path.join(codemodsPath, codemod);

    const pathToExecutable = path.join(
      __dirname,
      '..',
      '..',
      'node_modules',
      '.bin',
      'jscodeshift',
    );

    const command = `${pathToExecutable} \
          ${path.join(cwd, dist)} \
          -t ${codemodPath} \
          --ComponentName=${ComponentName} \
          --componentName=${componentName} \
          --verbose=2`;

    const execProc = exec(command);

    execProc.stderr.on('data', data => {
      logger.error(
        `Error while running codemod ${codemod}: ${data.toString()}`,
      );
      reject(data.toString());
    });

    execProc.on('exit', () => {
      logger.success(description);
      resolve();
    });
  });
};

module.exports = ({ ComponentName, description, codemodsPath, cwd }) => {
  try {
    const codemods = require(path.join(codemodsPath, 'index.js'));

    return Promise.all(
      codemods.map(codemod =>
        runCodemod({
          codemodsPath,
          ...codemod,
          ...createValuesMap({ ComponentName, description }),
          cwd,
        }),
      ),
    );
  } catch (e) {
    return Promise.reject(e);
  }
};
