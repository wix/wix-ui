const cwd = process.cwd();
const path = require('path');
const logger = require('./logger');

const runTasks = require('./run-tasks');
const runPrompts = require('./tasks/run-prompts');

const defaultTemplatesPath = 'generator/templates';
const defaultCodemodsPath = 'generator/codemods';

module.exports = ({
  force,
  componentName,
  description,
  templates,
  codemods,
}) => {
  try {
    require(path.join(cwd, 'package.json'));
  } catch (e) {
    const message =
      'ERROR: Please run `wuf` at module root (where package.json exists).';
    logger.error(message);
    return Promise.reject(message);
  }

  const options = {
    cwd,
    ComponentName: componentName,
    description,
    templatesPath: path.join(cwd, templates || defaultTemplatesPath),
    codemodsPath: path.join(cwd, codemods || defaultCodemodsPath),
    force,
  };

  if (options.componentName) {
    return runTasks(options);
  }

  return runPrompts().then(answers =>
    runTasks({
      ...options,
      ...answers,
    }),
  );
};
