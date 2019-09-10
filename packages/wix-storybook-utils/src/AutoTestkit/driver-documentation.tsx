import * as React from 'react';

import Markdown from '../Markdown';

import { FieldsDocumentation } from './fields-documentation';
import { Code } from '../Sections/views/import-example/Code';
import { flatten } from './flatten';
import { makeImportCode } from './make-import-code';
import { Descriptor } from './typings';

import { Testkit } from '../typings/config';
import { Metadata } from '../typings/metadata';

const extractNested = (descriptors: Descriptor[]) =>
  descriptors.reduce(
    (acc, descriptor) => {
      descriptor.type === 'object'
        ? acc.nested.push(descriptor)
        : acc.flat.push(descriptor);
      return acc;
    },
    { flat: [], nested: [] },
  );

interface Props {
  dataHook?: string;
  descriptor: any;
  metadata: Metadata;
  testkitConfig?: Testkit;
  title: string;
  unidriver: boolean;
}

export const DriverDocumentation: React.FunctionComponent<Props> = ({
  dataHook,
  descriptor,
  metadata,
  testkitConfig,
  title,
  unidriver,
}) => {
  const { nested, flat } = extractNested(descriptor);

  return (
    <div data-hook={dataHook}>
      <h2 data-hook="auto-testkit-driver-name">{title}</h2>

      {testkitConfig && (
        <Code dataHook="auto-testkit-driver-import-code">
          {makeImportCode({ testkit: testkitConfig, metadata })}
        </Code>
      )}

      {unidriver && (
        <Markdown
          source={`> **NOTE**: All UniDriver methods are asynchronous, use them with \`async\`/\`await\`!`}
        />
      )}

      {flat.length > 0 && (
        <div data-hook="auto-testkit-driver-descriptor">
          <FieldsDocumentation units={flat} />
        </div>
      )}

      {nested.length > 0 && (
        <div>
          <h4>This Testkit has nested API</h4>

          {nested.map(({ name, props }) => (
            <div key={props} data-hook="auto-testkit-driver-descriptor">
              <Markdown
                source={`Access these methods through \`${name}\` namespace `}
              />

              <FieldsDocumentation units={flatten(props, name)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
