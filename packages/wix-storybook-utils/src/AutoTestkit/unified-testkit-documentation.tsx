import * as React from 'react';

import { Code } from '../Sections/views/import-example/Code';
import { makeImportCode } from './make-import-code';
import { Metadata } from '../typings/metadata';
import { FieldsDocumentation } from './fields-documentation';
import { Descriptor } from './typings';
import { StoryConfig } from '../typings/story-config';

interface Props {
  dataHook?: string;
  metadata: Metadata;
  storyConfig: StoryConfig;
}

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

export const UnifiedTestkitDocumentation: React.FunctionComponent<Props> = ({
  dataHook,
  metadata,
  storyConfig,
}) => {
  const driver = metadata.drivers.filter(d =>
    /\.uni\.driver\.(js|tsx?)$/.test(d.file)
  );

  let error;
  if (driver.length === 0) {
    error = 'No unified testkit found!';
  } else {
    error = driver[0].error;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const { flat } = extractNested(driver[0].descriptor);
  return (
    <div data-hook={dataHook}>
      <h2 data-hook="auto-testkit-driver-name">Import</h2>

      <Code dataHook="auto-testkit-driver-import-code">
        {makeImportCode({
          testkit: {
            template: `import { <%= component.displayName %>Testkit } from '${storyConfig.config.importTestkitPath}/testkit';
import { <%= component.displayName %>Testkit } from '${storyConfig.config.importTestkitPath}/testkit/enzyme';
import { <%= component.displayName %>Testkit } from '${storyConfig.config.importTestkitPath}/testkit/puppeteer';`,
          },
          metadata,
        })}
      </Code>

      <h2 data-hook="auto-testkit-descriptor-title">API</h2>

      <div data-hook="auto-testkit-driver-descriptor">
        <FieldsDocumentation units={flat} />
      </div>
    </div>
  );
};
