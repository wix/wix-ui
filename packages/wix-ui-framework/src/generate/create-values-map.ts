import { pascalToCamel, pascalToKebab } from './utils';

export const createValuesMap = ({ ComponentName, description }) => {
  const componentName = pascalToCamel(ComponentName);
  const componentNameSnake = pascalToKebab(ComponentName);

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
