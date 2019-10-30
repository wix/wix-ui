import * as React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  code as baseCode,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import compoundComponentsAPI from './CompoundComponentsAPI.md';
import { storySettings } from '../test/storySettings';

import { HorizontalMenu } from '..';

const code = config => baseCode({ components: { HorizontalMenu }, ...config });

const exampleColumnChildren = (
  <HorizontalMenu.Item title="[fullWidth] Column Layout" expandSize="fullWidth">
    <HorizontalMenu.Layout.Columns columns={3}>
      <HorizontalMenu.Item title="Example Item 1" />
      <HorizontalMenu.Item title="Example Item 2" />
      <HorizontalMenu.Item title="Example Item 3" />
      <HorizontalMenu.Item title="Example Item 4" />
      <HorizontalMenu.Item title="Example Item 5" />
      <HorizontalMenu.Item title="Example Item 6" />
      <HorizontalMenu.Item title="Example Item 7" />
      <HorizontalMenu.Item title="Example Item 8" />
    </HorizontalMenu.Layout.Columns>
  </HorizontalMenu.Item>
);

const exampleGridChildren = (
  <HorizontalMenu.Item title="[menu] Grid Layout" expandSize="menu">
    <HorizontalMenu.Layout.Grid>
      <HorizontalMenu.Item title="Example Item 1" />
      <HorizontalMenu.Item title="Example Item 2" />
      <HorizontalMenu.Item title="Example Item 3" />
      <HorizontalMenu.Item title="Example Item 4" />
      <HorizontalMenu.Item title="Example Item 5" />
      <HorizontalMenu.Item title="Example Item 6" />
      <HorizontalMenu.Item title="Example Item 7" />
      <HorizontalMenu.Item title="Example Item 8" />
    </HorizontalMenu.Layout.Grid>
  </HorizontalMenu.Item>
);

const exampleListChildren = (
  <HorizontalMenu.Item title="[column] Single Column Layout">
    <HorizontalMenu.Layout.Columns>
      <HorizontalMenu.Item title="Example Item 1" />
      <HorizontalMenu.Item title="Example Item 2" />
      <HorizontalMenu.Item title="Example Item 3" />
      <HorizontalMenu.Item title="Example Item 4" />
      <HorizontalMenu.Item title="Example Item 5" />
      <HorizontalMenu.Item title="Example Item 6" />
      <HorizontalMenu.Item title="Example Item 7" />
      <HorizontalMenu.Item title="Example Item 8" />
    </HorizontalMenu.Layout.Columns>
  </HorizontalMenu.Item>
);

const exampleChildren = [
  exampleColumnChildren,
  exampleGridChildren,
  exampleListChildren,
];

const generateMenu = () => (
  <HorizontalMenu>{...exampleChildren}</HorizontalMenu>
);

const generateStringMenu = () => `
  <HorizontalMenu>
    <HorizontalMenu.Item title="[fullWidth] Column Layout" expandSize="fullWidth">
      <HorizontalMenu.Layout.Columns columns={3}>
        <HorizontalMenu.Item title="Example Item 1" />
        <HorizontalMenu.Item title="Example Item 2" />
        <HorizontalMenu.Item title="Example Item 3" />
        <HorizontalMenu.Item title="Example Item 4" />
        <HorizontalMenu.Item title="Example Item 5" />
        <HorizontalMenu.Item title="Example Item 6" />
        <HorizontalMenu.Item title="Example Item 7" />
        <HorizontalMenu.Item title="Example Item 8" />
      </HorizontalMenu.Layout.Columns>
    </HorizontalMenu.Item>

    <HorizontalMenu.Item title="[menu] Grid Layout" expandSize="menu">
      <HorizontalMenu.Layout.Grid>
        <HorizontalMenu.Item title="Example Item 1" />
        <HorizontalMenu.Item title="Example Item 2" />
        <HorizontalMenu.Item title="Example Item 3" />
        <HorizontalMenu.Item title="Example Item 4" />
        <HorizontalMenu.Item title="Example Item 5" />
        <HorizontalMenu.Item title="Example Item 6" />
        <HorizontalMenu.Item title="Example Item 7" />
        <HorizontalMenu.Item title="Example Item 8" />
      </HorizontalMenu.Layout.Grid>
    </HorizontalMenu.Item>

    <HorizontalMenu.Item title="[column] Single Column Layout">
      <HorizontalMenu.Layout.Columns>
        <HorizontalMenu.Item title="Example Item 1" />
        <HorizontalMenu.Item title="Example Item 2" />
        <HorizontalMenu.Item title="Example Item 3" />
        <HorizontalMenu.Item title="Example Item 4" />
        <HorizontalMenu.Item title="Example Item 5" />
        <HorizontalMenu.Item title="Example Item 6" />
        <HorizontalMenu.Item title="Example Item 7" />
        <HorizontalMenu.Item title="Example Item 8" />
      </HorizontalMenu.Layout.Columns>
    </HorizontalMenu.Item>
  </HorizontalMenu>
`;

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: HorizontalMenu,
  componentPath: '..',

  componentProps: {
    children: exampleChildren[0],
  },

  exampleProps: {
    children: exampleChildren,
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core/src/components/horizontal-menu/',
      component: generateMenu(),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'This line here should briefly describe component in just a sentence or two. It should be short and easy to read.',
            }),
          ]),

          columns([
            importExample(
              'import {HorizontalMenu} from \'wix-ui-core/horizontal-menu\';',
            ),
          ]),

          divider(),

          title('Examples'),

          columns([
            description({
              title: 'Simple Usage',
              text: 'A simple example with compact preview',
            }),

            code({
              compact: true,
              source: generateStringMenu(),
            }),
          ]),

          code({
            title: 'Full Interactive Preview',
            description: 'A non compact version of same code example as above',
            // source: `<HorizontalMenu items={${JSON.stringify(items)}} />`,
            source: generateStringMenu(),
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        {
          title: 'Compound components API',
          sections: [description(compoundComponentsAPI)],
        },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
