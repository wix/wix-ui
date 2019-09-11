import ejs from 'ejs';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import snakeCase from 'lodash/snakeCase';

import { Testkit } from '../typings/config';
import { Metadata } from '../typings/metadata';

export const makeImportCode = ({
  testkit,
  metadata,
}: {
  testkit: Testkit;
  metadata: Metadata;
}) =>
  ejs.render(testkit.template, {
    utils: {
      toCamel: camelCase,
      toKebab: kebabCase,
      toSnake: snakeCase,
      toPascal: (s: string) => {
        const camel: string = camelCase(s);
        return camel[0].toUpperCase() + camel.substring(1);
      },
    },

    component: metadata,
  });
