import * as React from 'react';
import Component from './component';

import {
  api,
  code,
  columns,
  description,
  divider,
  header,
  importExample,
  playground,
  tab,
  table,
  tabs,
  testkit,
  title,
} from '../src/Sections';

export default {
  category: 'Components',
  storyName: 'Component with section',
  component: Component,
  componentPath: './component.js',
  sections: [
    header({
      component: (
        <div style={{ background: '#bada55', boxShadow: '0 0 3px 0 blue' }}>
          Oh hello there!
        </div>
      ),
      issueUrl: 'https://github.com/wix/wix-ui/issues/new',
      sourceUrl: 'https://github.com/wix/wix-ui/',
    }),

    tabs([
      tab({
        title: 'Something something',
        sections: [
          title('Component Title'),

          importExample(`
import Button from 'wix-style-react/Button';
import Button from 'wix-style-react/Button';`),
          columns({
            title: 'Septyni astuoni keturiolika',
            items: [description(`🔨 To trigger an operation.`)],
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
                sections: [description('# im inside another tab!')],
              }),
            ],
          }),
        ],
      }),

      tab({
        title: 'how are you',
        sections: [
          importExample("import Component from 'your-library/Component';"),
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
    ]),
  ],
};
