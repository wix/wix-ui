import 'react';
import createStory from '../create-story';

import {Shlomi} from '../../src/components/Shlomi';
import * as ShlomiSource from '!raw-loader!../../src/components/Shlomi/Shlomi.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'Shlomi',
  storyName: 'Shlomi',
  component: Shlomi,
  componentProps: () => ({
    children: 'I\'m a Shlomi!',
    dataHook: 'storybook-badge'
  }),
  source: ShlomiSource
});
