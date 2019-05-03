import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

import * as logger from '../logger';
import { createValuesMap } from '../create-values-map';

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
      '..',
      'node_modules',
      '.bin',
      'jscodeshift',
    );

    const inputPath = path.join(cwd, dist);

    if (!fs.existsSync(inputPath)) {
      reject(`Error in ${codemod}: ${inputPath} does not exist`);
      return;
    }

    const command = `${pathToExecutable} \
          ${inputPath} \
          -t ${codemodPath} \
          --ComponentName=${ComponentName} \
          --componentName=${componentName} \
          --verbose=2`;

    const execProc = exec(command);

    execProc.stderr.on('data', data => {
      logger.error(`Error in ${codemod}: ${data.toString()}`);
      reject(data.toString());
    });

    execProc.on('exit', () => {
      logger.success(description);
      resolve();
    });
  });
};

export const runCodemods = ({
  ComponentName,
  description,
  codemodsPath,
  cwd,
}) => {
  try {
    const codemods = require(path.join(codemodsPath, 'index.js'));

    return Promise.all(
      codemods.map(codemod =>
        runCodemod({
          codemodsPath,
          ...createValuesMap({ ComponentName, description }),
          ...codemod,
          cwd,
        }),
      ),
    );
  } catch (e) {
    return Promise.reject(e);
  }
};
