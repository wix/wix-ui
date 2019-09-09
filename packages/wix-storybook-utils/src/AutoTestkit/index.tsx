import * as React from 'react';

import get from 'lodash/get';

import { Metadata } from '../typings/metadata';
import { StoryConfig } from '../typings/story-config';

import { DriverDocumentation } from './driver-documentation';
import { determineTestkit } from './determine-testkit';
import Markdown from '../Markdown';

interface Props {
  metadata: Metadata;
  storyConfig: StoryConfig;
}

export const AutoTestkit = ({ metadata, storyConfig }: Props) => (
  <div className="markdown-body">
    <h1 data-hook="auto-testkit-heading">{metadata.displayName} Testkits</h1>

    {get(storyConfig, 'config.testkitsWarning') && (
      <div data-hook="auto-testkit-warning">
        <Markdown source={storyConfig.config.testkitsWarning} />
      </div>
    )}

    {metadata.drivers
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
            descriptor={descriptor}
            metadata={metadata}
            title={title}
            testkit={get(storyConfig, `config.testkits.${type}`)}
          />
        );
      })}
  </div>
);
