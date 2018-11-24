import * as React from 'react';

import {
  tab,
  description,
  liveCode,
  code,
  importExample,
} from '../src/Sections';

const LiveExampleComponent = ({ disabled }) => (
  <div style={{ background: disabled ? 'red' : '#bada55' }}>
    Oh hello there!
  </div>
);

export default {
  category: 'Components',
  storyName: 'Component with section',
  componentPath: './component.js',
  sections: [
    tab({
      title: 'hello',
      sections: [
        code({
          description: 'oh fuck',
          source: '"hello"',
        }),
      ],
    }),

    tab({
      title: 'how are you',
      sections: [
        importExample({
          source: "import Component from 'your-library/Component';",
        }),

        description({
          text: 'hello guys!',
        }),

        liveCode({
          source: '<div><LiveExampleComponent/></div>',
          components: { LiveExampleComponent },
          compact: true,
        }),

        code({
          title: 'Below is code example',
          description: 'hey this some really cool code example!',
          source: '<div><LiveExampleComponent/></div>',
        }),
      ]
    }),


  ],
};
