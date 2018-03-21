import 'react';
import createStory from '../create-story';

import {Label} from '../../src/components/Label';
import * as LabelSource from '!raw-loader!../../src/components/Label/Label.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'Label',
  storyName: 'Label',
  component: Label,
  componentProps: (setState) => ({
    'data-hook': 'storybook-label',
    children: 'hello'
  }),
  source: LabelSource
});
