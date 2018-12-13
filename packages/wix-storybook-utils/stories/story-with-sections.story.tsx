import * as React from 'react';
import Component from './component';

import {
  tab,
  description,
  liveCode,
  code,
  importExample,
  api,
  playground,
  testkit,
} from '../src/Sections';

const LiveExampleComponent = ({ disabled }) => (
  <div style={{ background: disabled ? 'red' : '#bada55' }}>
    Oh hello there!
  </div>
);

export default {
  category: 'Components',
  storyName: 'Component with section',
  component: Component,
  componentPath: './component.js',
  sections: [
    tab({
      title: 'hello',
      sections: [
        tab({
          title: 'inner tab',
          sections: [
            code({
              description: 'this is the best code',
              source: '"hello"',
            }),

            api(),
          ],
        }),
        tab({
          title: 'inner tab #2',
          sections: [description({ text: 'im inside another tab!' })],
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
      ],
    }),

    tab({
      title: 'Playground',
      sections: [playground()],
    }),

    tab({
      title: 'Testkit',
      sections: [testkit()],
    }),
  ],
};
