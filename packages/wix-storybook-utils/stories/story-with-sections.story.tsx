import * as React from 'react';

import { description, liveCode, importExample } from '../src/Sections';

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
    importExample({
      source: "import Component from 'your-library/Component';",
    }),

    description({
      text: 'hello guys!',
    }),

    liveCode({
      source: '<div><LiveExampleComponent/></div>',
      components: { LiveExampleComponent },
      compact: true
    }),
  ],
};
