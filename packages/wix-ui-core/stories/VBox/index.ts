import 'react';
import createStory from '../create-story';

import {VBox} from '../../src/components/StylableVBox';
import * as VBoxSource from '!raw-loader!../../src/components/StylableVBox/VBox.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'VBox',
  storyName: 'StylableVBox',
  component: VBox,
  componentProps: (setState) => ({
    'data-hook': 'storybook-vbox',
    children: '<div>Hello</div><div>hello</div>'
  }),
  source: VBoxSource
});
