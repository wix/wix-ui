const utils = require('./utils');

module.exports = ({ ComponentName, description }) => {
  const componentName = utils.pascalToCamel(ComponentName);
  const componentNameSnake = utils.pascalToSnake(ComponentName);

  return {
    ComponentName,
    description,
    descriptionJSDoc:
      description === undefined
        ? ''
        : `/**
 * ${description}
 */`,
    componentName,
    'component-name': componentNameSnake,
  };
};
