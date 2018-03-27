import * as React from 'react';
import createStory from '../create-story';

import {HBox} from '../../src/components/HBox';
import * as HBoxSource from '!raw-loader!../../src/components/HBox/HBox.tsx';
import style from './style.st.css';

const children = new Array(5).fill(undefined).map(() => React.createElement('div', {}, 'hello'));
children.push(React.createElement('div', {}, 'Hello'));

export const story = () => createStory({
  category: 'Components',
  name: 'HBox',
  storyName: 'HBox',
  component: HBox,
  componentProps: (setState) => ({
    ...style('root'),
    'data-hook': 'storybook-hbox',
    children
  }),
  source: HBoxSource
});
