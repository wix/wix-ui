import * as React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  columns,
  playground,
  api,
  testkit,
  importExample,
  divider,
  code,
  title,
} from 'wix-storybook-utils/Sections';

import { Tooltip } from '../../src/components/tooltip';
import { ButtonNext } from '../../src/components/button-next';
import { baseScope, Category } from '../utils';

import * as examples from './examples';

const liveCode = config =>
  code({
    previewProps: {
      style: { backgroundColor: '#f0f4f7' },
    },
    compact: true,
    components: baseScope,
    ...config,
  });

const example = ({ source, ...rest }) =>
  columns([description({ ...rest }), liveCode({ source })]);

export default {
  category: Category.COMPONENTS,
  storyName: 'Tooltip',
  component: Tooltip,
  componentPath: '../../src/components/tooltip/Tooltip.tsx',

  componentProps: {
    'data-hook': 'story-tooltip-right',
    content: 'This is my tooltip',
    children: 'Hover me for a tooltip',
    placement: 'top',
  },

  exampleProps: {
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
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core/src/components/tooltip',
      component: (
        <Tooltip appendTo="window" content="HERE I AM! THIS IS ME!">
          <ButtonNext skin="dark">Hover me</ButtonNext>
        </Tooltip>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description(
              'A tooltip is a popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
            ),
          ]),

          importExample("import Tooltip from 'wix-ui-core/Tooltip';"),

          ...[
            {
              title: 'Plain Example',
              text: 'Plain example of how to use tooltip.',
              source: examples.basic,
            },
            {
              title: 'Placement',
              text: 'Tooltips have 14 different content placement states.',
              source: examples.placements,
            },
            {
              title: 'Delay',
              text:
                'Time in milliseconds to wait before showing or hiding the tooltip. Controlled by props `showDelay` or `hideDelay`.',
              source: examples.delay,
            },
            {
              title: 'Accessibility',
              text:
                'The tooltip content appears on keyboard focus for native focusable html elements like: `<button>` or `<input>` or components that uses `focusableHOC` from wix-ui-core',
              source: examples.a11y,
            },
            {
              title: 'Arrow',
              text: 'The tooltip content can appear with or without the arrow.',
              source: examples.arrow,
            },
          ].map(example),

          title('Floating Behaviour'),

          columns([
            liveCode({
              title: 'Flip: Enabled (default) & Fixed: Disabled (default)',
              subtitle:
                'Focus target element (TAB) and scroll viewport to see behaviour',
              source: examples.flip,
            }),
            liveCode({
              title: 'Flip: Disabled & Fixed: Disabled (default)',
              subtitle:
                'Focus target element (TAB) and scroll viewport to see behaviour',
              source: examples.flipnot,
            }),
          ]),
          columns([
            liveCode({
              title: 'Flip: Enabled (default) & Fixed: Enabled',
              subtitle:
                'Focus target element (TAB) and scroll viewport to see behaviour',
              source: examples.fixed,
            }),
          ]),

          title('Attachement to DOM'),

          columns([
            liveCode({
              title: 'Append to: parent',
              subtitle: `If you inspect the content, you'll see it is attached to a new div next to the target element.`,
              source: examples.parent,
            }),
            liveCode({
              title: 'Append to: window',
              subtitle: `If you inspect the content, you'll see it is attached to a new <div/> under the body.`,
              source: examples.window,
            }),
          ]),
          columns([
            liveCode({
              title: 'Append to: viewport',
              subtitle: `This is similar to window as it also appends the content to a new <div/> under the body, but also set its boundry to the viewport.`,
              source: examples.viewport,
            }),
            liveCode({
              title: 'Append to: scrollparent',
              subtitle: `If you inspect the content, you'll see it is attached to a new div under the list container.`,
              source: examples.scrollParent,
            }),
          ]),
          columns([
            liveCode({
              title: `Append to: (elm) => elm.getAttribute('attribute') === value`,
              subtitle: `Attach to custom parent element. Pass function that will accept element and return boolean whether given DOM element satisfies the provided testing function.`,
              source: examples.predicate,
            }),
          ]),
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
