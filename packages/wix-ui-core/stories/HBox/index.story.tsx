import * as React from 'react';

import {HBox} from '../../src/components/HBox';
import style from './style.st.css';

const children = [1, 2, 3, 4, 5].map(() => <div>hello</div>);

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
