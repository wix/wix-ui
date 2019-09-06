import * as React from 'react';
import Component from '../Component';

import { tabs, tab, testkit } from '../../src/Sections';

export default {
  category: 'Sections',
  storyName: 'Testkit section',
  component: Component,
  componentPath: '../Component.js',

  sections: [
    tabs([
      tab({
        title: 'Testkit section',
        sections: [testkit()],
      }),
    ]),
  ],
};
