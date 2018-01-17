import 'react';
import createStory from '../create-story';

import {Shlomi} from '../../src/components/Shlomi';
const ShlomiSource = require('!raw-loader!../../src/components/Shlomi/index.ts');

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
