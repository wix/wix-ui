import { description } from '../src/Sections';
import markdown from './examples/markdown-titles.md';

export default {
  category: 'Components',
  storyName: 'Composite component',
  sections: [
    description({
      text: markdown,
    }),
  ],
};
