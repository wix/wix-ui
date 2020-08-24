import * as React from 'react';

import { StoryConfig } from '../../typings/story-config';
import { ImportExampleSection } from '../../../typings/story-section';
import { importString } from '../../../StoryPage/import-string';

import { Code } from './Code';

export const importExample: (
  a: ImportExampleSection,
  b: StoryConfig,
) => React.ReactNode = ({ dataHook = '', source }, storyConfig) =>
  typeof source === 'string' ? (
    <Code data-hook={dataHook}>{source.trim()}</Code>
  ) : (
    source || (
      <Code data-hook={dataHook}>
        {importString({
          metadata: storyConfig.metadata,
          config: storyConfig.config,
          exampleImport: storyConfig.exampleImport,
        })}
      </Code>
    )
  );
