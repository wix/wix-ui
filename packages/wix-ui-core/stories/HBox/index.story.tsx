import * as React from 'react';

import {HBox} from '../../src/components/HBox';
import style from './style.st.css';

const children = new Array(5).fill(undefined).map(() => React.createElement('div', {}, 'hello'));
children.push(React.createElement('div', {}, 'Hello'));

export default {
  category: 'Components',
  storyName: 'HBox',

  component: HBox,
  componentPath: '../../src/components/HBox/HBox.tsx',

  componentProps: {
    ...style('root'),
    'data-hook': 'storybook-hbox',
    children
  }
};
