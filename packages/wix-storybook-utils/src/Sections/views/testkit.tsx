import * as React from 'react';

import { TestkitSection } from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { AutoTestkit } from '../../AutoTestkit/auto-testkit';

export const testkit = (
  section: TestkitSection,
  storyConfig: StoryConfig,
): React.ReactNode => (
  <AutoTestkit unidriver={section.unidriver} component={storyConfig.metadata} />
);
