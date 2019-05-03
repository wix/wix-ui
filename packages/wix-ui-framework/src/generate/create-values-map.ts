import { pascalToCamel, pascalToKebab } from './utils';

export interface CodemodValues {
  ComponentName: string;
  componentName: string;
  'component-name': string;
  description: string;
}

export const createValuesMap = ({ ComponentName, description }) => ({
  ComponentName,
  componentName: pascalToCamel(ComponentName),
  'component-name': pascalToKebab(ComponentName),
  description: description || ComponentName,
});
