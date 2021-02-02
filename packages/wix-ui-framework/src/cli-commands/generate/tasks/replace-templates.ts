import ejs from 'ejs';

import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import snakeCase from 'lodash/snakeCase';

const utils = {
  toCamel: camelCase,
  toKebab: kebabCase,
  toSnake: snakeCase,
  toPascal: (s: string) => {
    const camel: string = camelCase(s);
    return camel[0].toUpperCase() + camel.substring(1);
  },
};

export const replaceTemplates = (source: string, scope: Object) => {
  /*
   * TODO: usage of `{%` & `%}` tags is deprecated!
   * regular EJS should be used in user templates
   *
   * keeping it to not break existing users
   * can be removed either:
   * 1. with major version release
   * 2. when ensured no consumers use it
   */
  const replaceDeprecatedSyntax = source.replace(/{%[\w-]+%}/g, (match) => {
    const key = match.slice(2, -2);

    if (!scope.hasOwnProperty(key)) {
      throw new Error(`key '${key}' must be one of: [${Object.keys(scope)}]`);
    }

    return scope[key];
  });

  try {
    return ejs.render(replaceDeprecatedSyntax, {
      utils,
      ...scope,
    });
  } catch (e) {
    throw new Error(`Erroneous template syntax: ${e}`);
  }
};
