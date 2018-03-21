import * as React from 'react';
import createStory from '../create-story';

import {HBox} from '../../src/components/StylableHBox';
import * as HBoxSource from '!raw-loader!../../src/components/StylableHBox/HBox.tsx';
import style from './style.st.css';

const children = new Array(5).fill(undefined).map(() => React.createElement('div', {}, 'hello'));

export const story = () => createStory({
  category: 'Components',
  name: 'HBox',
  storyName: 'StylableHBox',
  component: HBox,
  componentProps: (setState) => ({
    ...style('root'),
    'data-hook': 'storybook-hbox',
    children
  }),
  source: HBoxSource
});
