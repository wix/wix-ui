import React from 'react';
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

import { storySettings } from '../test/storySettings';

import PopoverNext from '..';

const code = config => baseCode({ components: { PopoverNext }, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: PopoverNext,
  componentPath: '..',

  componentProps: {
    buttonText: 'Hello World!',
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core/src/components/popover-next/',
      component: <PopoverNext buttonText='Click me!' />,
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
              'import PopoverNext from \'wix-ui-core/popover-next\';',
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
              source: '<PopoverNext buttonText="Hello World!"/>',
            }),
          ]),

          code({
            title: 'Full Interactive Preview',
            description: 'A non compact version of same code example as above',
            source: '<PopoverNext buttonText="Hello World!"/>',
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
