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
  title
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
      dataHook: 'section-header'
    }),

    tabs([
      tab({
        title: 'Import Example',
        sections: [
          title('Component Title'),

          importExample(`
import Button from 'wix-style-react/Button';
import Button from 'wix-style-react/Button';`),
          columns({
            title: 'Septyni astuoni keturiolika',
            items: [description(`🔨 To trigger an operation.`)]
          }),

          divider()
        ]
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
            darkBackground: true
          }
        ].map(code)
      }),

      tab({
        title: 'how are you',
        sections: [
          importExample("import Component from 'your-library/Component';")
        ]
      }),

      ...[
        { title: 'Playground', sections: [playground()] },
        { title: 'Testkit', sections: [testkit()] }
      ].map(tab)
    ])
  ]
};
