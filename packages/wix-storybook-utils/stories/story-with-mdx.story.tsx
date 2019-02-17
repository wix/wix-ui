import * as React from 'react';
import Component from './component';
import { mdx } from '../src/Sections';

import MDX from './examples/markdown.mdx';

export default {
  category: 'Components',
  storyName: 'Component with section 2',
  component: Component,
  componentPath: './component.js',
  sections: [mdx({ content: MDX })],
};
