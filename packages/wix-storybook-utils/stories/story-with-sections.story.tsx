import {
  description,
  code,
  importExample,
} from '../src/Sections/section-builders';

console.log(description);

export default {
  category: 'Components',
  storyName: 'Component with section',
  componentPath: './component.js',
  sections: [
    importExample({
      source: "import Component from 'your-library/Component';",
    }),

    description({
      text: 'hello guys!',
    }),

    code({
      source: "'hello';",
    }),
  ],
};
