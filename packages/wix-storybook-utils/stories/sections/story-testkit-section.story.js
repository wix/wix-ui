import * as React from 'react';
import Component from '../component';

import { tabs, tab, title, testkit } from '../../src/Sections';

export default {
  category: 'Sections',
  storyName: 'Testkit section',
  component: Component,
  componentPath: '../component.js',

  sections: [
    tabs([
      tab({
        title: 'Testkit section',
        sections: [testkit()]
      })
    ])
  ]
};
