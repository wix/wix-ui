import * as React from 'react';

import { StoryConfig } from '../../typings/story-config';
import { Metadata } from '../../typings/metadata';
import { ApiSection } from '../../typings/story-section';

import AutoDocs from '../../AutoDocs';

export const api: (a: ApiSection, b: StoryConfig) => React.ReactNode = (
  section,
  storyConfig,
) => (
  <AutoDocs
    metadata={(section.parsedSource as Metadata) || storyConfig.metadata}
  />
);
