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
  table,
  tabs,
  divider,
} from '../src/Sections';

export default {
  category: 'Components',
  storyName: 'Component with section',
  component: Component,
  componentPath: './component.js',
  sections: [
    tab({
      title: 'Something something',
      sections: [
        importExample({
          source: `import Button from 'wix-style-react/Button';
import Button from 'wix-style-react/Button';`,
        }),
        columns({
          title: 'Septyni astuoni keturiolika',
          items: [description({ text: `🔨 To trigger an operation.` })],
        }),

        divider(),
      ],
    }),

    tab({
      title: 'hello',
      sections: [
        description({
          title: 'lol',
          text: 'I should not be in a tab',
        }),

        table({
          title: 'Included Components',
          rows: [
            ['&lt;FormField/&gt;', 'Layout component for form elements'],
            ['&lt;Input /&gt;', 'Component that receives data'],
          ],
        }),

        tabs({
          title: 'title',
          tabs: [
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
