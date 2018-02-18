import * as React from 'react';
import createStory from '../create-story';

import {Badge} from '../../src/components/StylableBadge';
import * as StylableBadgeSource from '!raw-loader!../../src/components/StylableBadge/Badge.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'StylableBadge',
  storyName: 'StylableBadge',
  component: Badge,
  componentProps: () => ({
    children: 'I\'m a Badge!',
    'data-hook': 'storybook-badge'
  }),
  source: StylableBadgeSource
});
