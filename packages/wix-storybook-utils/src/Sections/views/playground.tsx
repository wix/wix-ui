import * as React from 'react';
import { PlaygroundSection } from '../../typings/story-section';

import { StoryConfig } from '../../typings/story-config';

const AutoExample = require('../../AutoExample').default;

export const playground = (
  section: PlaygroundSection,
  {
    metadata,
    component,
    componentProps,
    componentWrapper,
    exampleProps,
    codeExample,
  }: StoryConfig,
): React.ReactNode => (
  <AutoExample
    {...{
      parsedSource: metadata,
      component,
      componentProps,
      componentWrapper,
      exampleProps,
      codeExample,
    }}
  />
);
