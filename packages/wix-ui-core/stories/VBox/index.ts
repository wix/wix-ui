import * as React from 'react';
import createStory from '../create-story';

import {VBox} from '../../src/components/VBox';
import * as VBoxSource from '!raw-loader!../../src/components/VBox/VBox.tsx';
import style from './style.st.css';

const children = new Array(5).fill(undefined).map(() => React.createElement('div', {}, 'hello'));

export const story = () => createStory({
  category: 'Components',
  name: 'VBox',
  storyName: 'VBox',
  component: VBox,
  componentProps: (setState) => ({
    ...style('root'),
    'data-hook': 'storybook-vbox',
    children
  }),
  source: VBoxSource
});
