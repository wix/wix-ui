import { description } from '../src/Sections';

const markdown = require('./examples/markdown-titles.md');

export default {
  category: 'Components',
  storyName: 'Composite component',
  sections: [
    description({
      text: markdown,
    }),
  ],
};
