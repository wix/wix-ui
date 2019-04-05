import { description } from '../../src/Sections';

const markdown = require('../examples/markdown-titles.md');

export default {
  category: 'Sections',
  storyName: 'Composite component',
  sections: [
    description({
      text: markdown,
    }),
  ],
};
