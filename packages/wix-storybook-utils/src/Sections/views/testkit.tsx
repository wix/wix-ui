import * as React from 'react';

import { TestkitSection } from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { AutoTestkit } from '../../AutoTestkit';

export const testkit = (
  section: TestkitSection,
  storyConfig: StoryConfig,
): React.ReactNode => <AutoTestkit metadata={storyConfig.metadata} />;
