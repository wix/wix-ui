import * as React from 'react';

import {VBox} from '../../src/components/VBox';
import style from './style.st.css';

const children = [1, 2, 3, 4, 5].map(i => <div key="i">hello</div>);

export default {
  category: 'Components',
  storyName: 'VBox',

  component: VBox,
  componentPath: '../../src/components/VBox/VBox.tsx',

  componentProps: {
    ...style('root'),
    'data-hook': 'storybook-vbox',
    children
  }
};
