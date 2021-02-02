import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

import * as logger from '../../../logger';
import { Options, CodemodConfig } from '../typings.d';
import { createValuesMap, CodemodValues } from '../create-values-map';

const runCodemod: ({
  options: Options,
  codemodValues: CodemodValues,
  codemodConfig: CodemodConfig,
}) => Promise<void> = ({ options, codemodValues, codemodConfig }) =>
  new Promise((resolve, reject) => {
    const codemodPath = path.join(options.codemods, codemodConfig.codemod);

    const pathToExecutable = path.join(
      options._process.cwd,
      'node_modules',
      '.bin',
      'jscodeshift',
    );

    const inputPath = path.join(options._process.cwd, codemodConfig.dist);

    if (!fs.existsSync(inputPath)) {
      reject(`Error in ${codemodConfig.codemod}: ${inputPath} does not exist`);
      return;
    }

    const command = `${pathToExecutable} \
      ${inputPath} \
      -t ${codemodPath} \
      --ComponentName=${codemodValues.ComponentName} \
      --componentName=${codemodValues.componentName} \
      --component-name=${codemodValues['component-name']} \
      --verbose=2`;

    const execProc = exec(command);

    execProc.stderr.on('data', (data) => {
      logger.error(`Error in ${codemodConfig.codemod}: ${data.toString()}`);
      reject(data.toString());
    });

    execProc.on('exit', () => {
      logger.success(codemodConfig.description);
      resolve();
    });
  });

export const runCodemods: (options: Options) => Promise<void> = (options) => {
  const { ComponentName, description, codemods } = options;

  const codemodsIndex: CodemodConfig[] = require(path.resolve(
    options._process.cwd,
    codemods,
  ));

  const codemodValues: CodemodValues = createValuesMap({
    ComponentName,
    description,
  });

  return codemodsIndex.reduce(
    (promise, codemodConfig) =>
      promise.then(() =>
        runCodemod({
          options,
          codemodValues,
          codemodConfig,
        }),
      ),
    Promise.resolve(),
  );
};
