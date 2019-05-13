import * as React from 'react';

import { PlaygroundSection } from '../../../typings/story-section';
import { Metadata } from '../../../typings/metadata';
import { StoryConfig } from '../../../typings/story-config';

import AutoExample from '../../../AutoExample';

const filterDeprecatedProps: (a: Metadata) => Metadata = metadata => ({
  ...metadata,
  props: Object.entries(metadata.props)
    .filter(
      ([name, prop]) =>
        !(prop.tags || []).some(({ title }) => title === 'deprecated'),
    )
    .reduce((props, [name, prop]) => ({ ...props, [name]: prop }), {}),
});

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
      parsedSource: filterDeprecatedProps(metadata),
      component,
      componentProps,
      componentWrapper,
      exampleProps,
      codeExample,
    }}
  />
);
