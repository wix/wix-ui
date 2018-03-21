import * as React from 'react';
import createStory from '../create-story';

import {VBox} from '../../src/components/StylableVBox';
import * as VBoxSource from '!raw-loader!../../src/components/StylableVBox/VBox.tsx';
import style from './style.st.css';

const children = new Array(5).fill(undefined).map(() => React.createElement('div', {}, 'hello'));

export const story = () => createStory({
  category: 'Components',
  name: 'VBox',
  storyName: 'StylableVBox',
  component: VBox,
  componentProps: (setState) => ({
    ...style('root'),
    'data-hook': 'storybook-vbox',
    children
  }),
  source: VBoxSource
});