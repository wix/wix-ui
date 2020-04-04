import * as React from 'react';
import {
  api,
  code,
  columns,
  description,
  testkit,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  example as baseExample,
  title,
} from 'wix-storybook-utils/Sections';
import { Popover } from '../../src/components/popover';
import { Category, baseScope } from '../utils';

const example = config => baseExample({ components: baseScope, ...config });

import * as examples from './examples';

export default {
  category: Category.COMPONENTS,
  storyName: 'Popover',
  component: Popover,
  componentPath: '../../src/components/popover-next/popover-next.tsx',
  componentProps: {
    'data-hook': 'storybook-popover',
    children: [
      <Popover.Element key="1">This is the Popover.Element</Popover.Element>,
      <Popover.Content key="2">Content</Popover.Content>,
    ],
    appendTo: 'window',
    showArrow: true,
    timeout: 150,
    shown: false,
    fluid: false,
    placement: 'top',
  },

  exampleProps: {
    children: [
      {
        label: 'Default example',
        value: [
          <Popover.Element key="1">
            This is the Popover.Element
          </Popover.Element>,
          <Popover.Content key="2">Content</Popover.Content>,
        ],
      },
    ],
    appendTo: [
      { label: 'window', value: window },
      { label: 'scrollParent', value: 'scrollParent' },
      { label: 'viewport', value: 'viewport' },
      { label: 'parent', value: 'parent' },
      { label: 'null', value: null },
    ],
    placement: [
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ],
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-ui/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-ui/blob/master/packages/wix-ui-core/src/components/popover/Popover.tsx',
      component: (
        <Popover shown placement="top" showArrow>
          <Popover.Element>Popover Element</Popover.Element>,
          <Popover.Content>Content</Popover.Content>
        </Popover>
      ),
    }),
    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description('The floating card popped by clicking or hovering.'),
          ]),

          importExample(),

          divider(),

          title('Examples'),

          example({
            title: 'Simple',
            text: 'A simple example of Popover usage',
            source: examples.simple,
          }),

          example({
            title: 'Placement',
            text: 'There is a variety of options for placement selection.',
            source: examples.placement,
          }),

          example({
            title: 'MoveBy',
            text:
              '<em>x</em> and <em>y</em> axis orientation is relative to the placement of the popover.',
            source: examples.moveBy,
          }),

          example({
            title: 'zIndex',
            text:
              'If some container got higher zIndex then Popover content - the zIndex of Popover content can be controlled',
            source: examples.zIndex,
          }),

          title('Floating Behaviour'),

          example({
            title: 'Flip:Enabled & Fixed: Disabled',
            text:
              'Focus target element (TAB) and scroll viewport to see behaviour',
            source: examples.flip,
          }),

          example({
            title: 'Flip: Disabled & Fixed: Enabled',
            text:
              'Focus target element (TAB) and scroll viewport to see behaviour',
            source: examples.fixed,
          }),

          title('Handling Overflow'),

          example({
            title: 'appendTo="window"',
            text: `If you inspect the content, you'll see it is attached to a new div under the body.`,
            source: examples.window,
          }),

          example({
            title: 'appendTo="scrollParent"',
            text: `If you inspect the content, you'll see it is attached to a new div under the list container.`,
            source: examples.scrollParent,
          }),

          example({
            title: 'appendTo="viewport"',
            text: `If you inspect the content, you'll see it is attached to a document.body but the popvoer content element reacts to screen viewport.`,
            source: examples.viewPort,
          }),

          example({
            title: `appendTo={elm => elm.getAttribute('attribute') === 'value'}`,
            text: `Sometimes we want a to target certain overflow element. A function can be passed that will be run against all parent elements until found.If you inspect the content, you'll see it is attached to a document.body but the popvoer content element reacts to screen viewport.`,
            source: examples.predicate,
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
