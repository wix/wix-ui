import * as React from 'react';
import { PlaygroundSection } from '../../typings/story-section';

import { StoryConfig } from '../../typings/story-config';

const AutoExample = require('../../AutoExample').default;

export const playground: ((
  a: PlaygroundSection,
  b: StoryConfig,
) => React.ReactNode) = (section, storyConfig) => (
    <AutoExample
      {...{
        parsedSource: storyConfig.metadata,
        component: storyConfig.component,
        componentProps: storyConfig.componentProps,
        componentWrapper: storyConfig.componentWrapper,
        exampleProps: storyConfig.exampleProps,
        codeExample: storyConfig.codeExample,
      }}
    />
);
