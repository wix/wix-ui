import * as React from 'react';
import Component from '../Component';

import {
  code,
  columns,
  description,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  testkit,
} from '../../src/Sections';

export default {
  category: 'Sections',
  storyName: 'Component with section',
  component: Component,
  componentPath: '../Component.js',
  sections: [
    header({
      component: (
        <div
          data-hook="header-component"
          style={{ background: '#bada55', boxShadow: '0 0 3px 0 blue' }}
        >
          Oh hello there!
        </div>
      ),
      sourceUrl: 'https://github.com/wix/wix-ui/',
      dataHook: 'section-header',
    }),

    tabs([
      tab({
        title: 'Import Example',
        sections: [
          description({
            title: 'Description',
            text: 'This is a dummy example of story page with some sections',
          }),

          importExample(`import Button from 'wix-style-react/Button';
import Button from 'wix-style-react/Button';`),

          divider(),

          columns([
            description({
              pretitle: 'Pretitle of description',
              title: 'Fully Described block with **markdown**',
              subtitle: 'Subtitle of description',
              description: `This is description of a \`description\` section ;)

new line`,
              text:
                'This is a dummy example of story page with some `sections`',
            }),

            description({
              title: 'Description w/o pretitle',
              subtitle: 'But still with subtitle',
              description: 'And still with description of `description`',
              text:
                'This is a dummy example of story page with some `sections`',
            }),
          ]),

          columns([
            description({
              title: 'Another Description',
              description: 'This is description of a `description` section ;)',
              text:
                'This is a dummy example of story page with some `sections`',
            }),

            description({
              title: 'Another Description',
              text:
                'This is a dummy example of story page with some `sections`',
            }),
          ]),
        ],
      }),

      tab({
        title: 'Code Section Examples',
        sections: [
          { title: 'Default', source: '<div>fun</div>' },
          { title: 'Dark', source: '<div>fun</div>', darkBackground: true },
          { title: 'Compact', source: '<div>fun</div>', compact: true },
          {
            title: 'Compact & Dark',
            source: '<div>fun</div>',
            compact: true,
            darkBackground: true,
          },
        ].map(code),
      }),

      tab({
        title: 'how are you',
        sections: [
          importExample("import Component from 'your-library/Component';"),
        ],
      }),

      ...[
        { title: 'Playground', sections: [playground()] },
        { title: 'Testkit', sections: [testkit()] },
      ].map(tab),
    ]),
  ],
};
