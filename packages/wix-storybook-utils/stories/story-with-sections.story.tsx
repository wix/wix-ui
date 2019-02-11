import * as React from 'react';
import Component from './component';

import {
  tab,
  description,
  code,
  importExample,
  api,
  playground,
  testkit,
  columns,
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
      title: 'Something something',
      sections: [
        columns({
          title: 'Septyni astuoni keturiolika',
          items: [
            description({ text: `🔨 To trigger an operation.` }),
            importExample({
              source: "import Button from 'wix-style-react/Button';",
            }),
          ],
        }),
      ],
    }),

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
          sections: [description({ text: '# im inside another tab!' })],
        }),
      ],
    }),

    tab({
      title: 'how are you',
      sections: [
        importExample({
          source: "import Component from 'your-library/Component';",
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
