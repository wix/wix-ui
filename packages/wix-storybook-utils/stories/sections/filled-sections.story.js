import * as React from 'react';
import Component from '../component';

import { header } from '../../src/Sections';

export default {
  category: 'Sections',
  storyName: 'Filled Sections',
  component: Component,
  componentPath: '../component.js',

  sections: [
    header({
      component: 'Hello there!',
    }),
  ],
};
