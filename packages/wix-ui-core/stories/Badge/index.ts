import 'react';
import createStory from '../create-story';

import {Badge} from '../../src/components/Badge';
import * as ShlomiSource from '!raw-loader!../../src/components/Badge/Badge.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'Badge',
  storyName: 'Badge',
  component: Badge,
  componentProps: () => ({
    children: 'I\'m a Badge!',
    dataHook: 'storybook-badge'
  }),
  source: ShlomiSource
});
