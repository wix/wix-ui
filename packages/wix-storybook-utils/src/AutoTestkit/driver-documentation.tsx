import * as React from 'react';

import ejs from 'ejs';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import snakeCase from 'lodash/snakeCase';

import { FieldsDocumentation } from './fields-documentation';
import { Code } from '../Sections/views/import-example/Code';
import { flatten } from './flatten';

import { Testkit } from '../typings/config';
import { Metadata } from '../typings/metadata';

interface Props {
  dataHook?: string;
  descriptor: any;
  metadata: Metadata;
  testkit?: Testkit;
  title: string;
}

const makeImportCode = ({
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

export const DriverDocumentation = ({
  dataHook,
  descriptor,
  metadata,
  testkit,
  title,
}: Props) => (
  <div data-hook={dataHook}>
    <h2 data-hook="auto-testkit-driver-name">{title}</h2>

    {testkit && (
      <Code dataHook="auto-testkit-driver-import-code">
        {makeImportCode({ testkit, metadata })}
      </Code>
    )}

    <div data-hook="auto-testkit-driver-descriptor">
      <FieldsDocumentation units={flatten(descriptor)} />
    </div>
  </div>
);
