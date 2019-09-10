import * as React from 'react';
import Component from '../Component';

import { header } from '../../src/Sections';

export default {
  category: 'Sections',
  storyName: 'Filled Sections',
  component: Component,
  componentPath: '../Component.js',

  sections: [
    header({
      component: 'Hello there!',
    }),
  ],
};
