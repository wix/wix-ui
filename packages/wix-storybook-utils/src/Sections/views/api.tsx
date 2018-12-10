import * as React from 'react';

import { StoryConfig } from '../../typings/story-config';
import { ApiSection } from '../../typings/story-section';
const AutoDocs = require('../../AutoDocs').default;

export const api: ((a: ApiSection, b: StoryConfig) => React.ReactNode) = (
  section,
  storyConfig,
) => <AutoDocs parsedSource={storyConfig.metadata} />;
