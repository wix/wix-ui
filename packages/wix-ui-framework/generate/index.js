const cwd = process.cwd();
const path = require('path');

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
    return Promise.reject(
      'ERROR: `wuf generate` must be run at root of the module (where package.json exists).',
    );
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
