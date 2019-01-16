import { isObject } from './is-object';

export const deepAssign = (root = {}, assignable = {}) =>
  Object.keys(assignable).reduce((assigned, key) => {
    const value = assignable[key];

    return {
      ...assigned,
      [key]: isObject(value) ? deepAssign(value, assigned[key]) : value,
    };
  }, root);
