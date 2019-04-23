const utils = require('./utils');

module.exports = answers => {
  const componentName = utils.pascalToCamel(answers.ComponentName);
  const componentNameSnake = utils.pascalToSnake(answers.ComponentName);

  return {
    ...answers,
    descriptionJSDoc:
      answers.description === undefined
        ? ''
        : `/**
 * ${answers.description}
 */`,
    componentName,
    CATEGORY: answers.testComponent ? 'TESTS' : 'COMPONENTS',
    'component-name': componentNameSnake,
  };
};
