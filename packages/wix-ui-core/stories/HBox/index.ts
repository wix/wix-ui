import 'react';
import createStory from '../create-story';

import {HBox} from '../../src/components/StylableHBox';
import * as HBoxSource from '!raw-loader!../../src/components/StylableHBox/HBox.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'HBox',
  storyName: 'StylableHBox',
  component: HBox,
  componentProps: (setState) => ({
    'data-hook': 'storybook-hbox',
    children: '<div>Hello</div><div>hello</div>'
  }),
  source: HBoxSource
});
