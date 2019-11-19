import * as React from 'react';

import { StoryConfig } from '../../typings/story-config';
import { PluginSection } from '../../typings/story-section';

export const plugin = (
  section: PluginSection,
  storyConfig: StoryConfig,
): React.ReactNode => {
  return section.handler(section, storyConfig);
};
