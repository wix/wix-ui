import * as React from 'react';

import get from 'lodash/get';

import { Metadata } from '../typings/metadata';
import { StoryConfig } from '../typings/story-config';

import { DriverDocumentation } from './driver-documentation';
import { UnifiedTestkitDocumentation } from './unified-testkit-documentation';
import { isUnidriver, determineTestkit } from './determine-testkit';
import Markdown from '../Markdown';

interface Props {
  metadata: Metadata;
  storyConfig: StoryConfig;
}

const unidriverFirst = drivers => {
  const [unidrivers, others] = drivers.reduce(
    ([uni, rest], driver) => {
      if (isUnidriver(driver.file)) {
        uni.push(driver);
      } else {
        rest.push(driver);
      }
      return [uni, rest];
    },
    [[], []],
  );

  return [...unidrivers, ...others];
};

const createDriverDocumentation = (metadata, storyConfig) => {
  return unidriverFirst(metadata.drivers)
    .filter(({ error }) => !error)
    .map(({ file, descriptor }) => {
      const { type, title } = determineTestkit({
        fileName: file,
        displayName: metadata.displayName,
      });

      return (
        <DriverDocumentation
          key={file}
          dataHook="auto-testkit-driver"
          unidriver={isUnidriver(file)}
          descriptor={descriptor}
          metadata={metadata}
          title={title}
          testkitConfig={get(storyConfig, `config.testkits.${type}`)}
        />
      );
    });
};

const createUnifiedTestkitDocumentation = metadata => {
  return (
    <UnifiedTestkitDocumentation
      dataHook="auto-unified-testkit"
      metadata={metadata}
    />
  );
};

export const AutoTestkit = ({ metadata, storyConfig }: Props) => (
  <div className="markdown-body">
    {get(storyConfig, 'config.unifiedTestkit') ? (
      <h1 data-hook="auto-testkit-heading">{metadata.displayName} Testkit</h1>
    ) : (
      <h1 data-hook="auto-testkit-heading">{metadata.displayName} Testkits</h1>
    )}

    {get(storyConfig, 'config.testkitsWarning') && (
      <div data-hook="auto-testkit-warning">
        <Markdown source={storyConfig.config.testkitsWarning} />
      </div>
    )}

    {get(storyConfig, 'config.unifiedTestkit')
      ? createUnifiedTestkitDocumentation(metadata)
      : createDriverDocumentation(metadata, storyConfig)}
  </div>
);
