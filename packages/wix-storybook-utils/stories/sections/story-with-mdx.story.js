import Component from '../Component';
import { mdx } from '../../src/Sections';

import MDX from '../components/examples/markdown.mdx';

export default {
  category: 'Components',
  storyName: 'Component with section 2',
  component: Component,
  componentPath: '../Component.js',
  sections: [mdx({ content: MDX })],
};
