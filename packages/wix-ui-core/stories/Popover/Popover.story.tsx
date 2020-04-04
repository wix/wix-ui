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

  // examples: (
  //   <div>
  //     <h1>Examples</h1>
  //     <p>
  //       The examples here have a wrapping component with open/close state. Click
  //       the target or the content to toggle open/close
  //     </p>
  //     <div>
  //       <h2>AppendTo = 'window'</h2>
  //       <p>
  //         If you inspect the content, you'll see it is attached to a new div
  //         under the body.
  //       </p>
  //       <PopoverWithState
  //         appendTo="window"
  //         data-hook="popover-appendto-window"
  //       />
  //     </div>
  //     <div>
  //       <h2>AppendTo = 'scrollParent'</h2>
  //       <p>
  //         If you inspect the content, you'll see it is attached to a new div
  //         under the list container.
  //       </p>
  //   <div
  //     style={{
  //       overflow: 'auto',
  //       height: '100px',
  //       width: '400px',
  //       border: '1px solid black',
  //     }}
  //   >
  //     <ul>
  //       <li>item</li>
  //       <PopoverWithState
  //         appendTo="scrollParent"
  //         data-hook="popover-appendto-scroll-parent"
  //       />
  //       <li>item</li>
  //       <li>item</li>
  //       <li>item</li>
  //       <li>item</li>
  //       <li>item</li>
  //       <li>item</li>
  //       <li>item</li>
  //       <li>item</li>
  //       <li>item</li>
  //       <li>item</li>
  //     </ul>
  //   </div>
  // </div>
  //     <div>
  //       <h2>moveBy={'{x:50, y:100}'}</h2>
  //       <p>
  //         <em>x</em> and <em>y</em> axis orientation is relative to the
  //         placement of the popover.
  //         <br />
  //         <br />
  //         The <code>flip</code> behaviour is disabled when this props is used,
  //         in order to support negative values when making the
  //         <br />
  //         Content element (<code>{`<Popover.Content/>`}</code>) intentionally
  //         overlapping the Target element (<code>{`<Popover.Element/>`}</code>).
  //       </p>
  //       <Popover
  //         placement="right"
  //         shown
  //         moveBy={{ x: 50, y: 100 }}
  //         showArrow
  //       >
  //         <Popover.Element>
  //           <div style={{ height: '80px' }}>The element</div>
  //         </Popover.Element>
  //         <Popover.Content>The content</Popover.Content>
  //       </Popover>
  //     </div>

  //     <div>
  //       <h2>Delays</h2>
  //       <p>
  //         You can set the <code>hideDelay</code> and <code>showDelay</code>{' '}
  //         props in order to delay the popover's enterance. Value is in{' '}
  //         <em>milliseconds</em>.
  //         <br />
  //         The following example sets <code>hideDelay</code> and{' '}
  //         <code>showDelay</code> to &nbsp;
  //         <code>1000</code> (1 second).
  //         <br />
  //         You can click the popover in order to change its <code>
  //           shown
  //         </code>{' '}
  //         state.
  //       </p>

  //       <br />

  //       <PopoverWithState showDelay={1000} hideDelay={1000} />
  //     </div>

  //     <div data-hook="story-popover-flip-behaviour">
  //       <h2>Flip behaviour</h2>
  //       <p>
  //         This behaviour used to flip the <code>{`<Popover/>`}</code>'s
  //         placement when it starts to overlap the target element (
  //         <code>{`<Popover.Element/>`}</code>).
  //         <br />
  //         It is enabled by default.
  //       </p>

  //       <br />

  //       <ScrollableContainer dataHook="story-popover-flip-enabled">
  //         With <code>flip</code> enabled (default):
  //         <br />
  //         <br />
  //         <br />
  //         <PopoverWithState placement="top" />
  //       </ScrollableContainer>

  //       <ScrollableContainer dataHook="story-popover-flip-disabled">
  //         With <code>flip</code> disabled:
  //         <br />
  //         <br />
  //         <br />
  //         <PopoverWithState placement="top" flip={false} />
  //       </ScrollableContainer>
  //     </div>

  //     <div data-hook="story-popover-fixed-behaviour">
  //       <h2>Fixed behaviour</h2>
  //       <p>
  //         This behaviour used to keep the <code>{`<Popover/>`}</code> in it's
  //         original placement.
  //         <br /> By default this behaviour is <b>disabled</b>, and the &nbsp;
  //         <code>{`<Popover/>`}</code> will change it's position when it'll being
  //         positioned outside
  //         <br />
  //         the boundary (the boundry is the value of the <code>
  //           appendTo
  //         </code>{' '}
  //         prop).
  //         <br />
  //       </p>

  //       <br />

  //       <ScrollableContainer dataHook="story-popover-fixed-disabled">
  //         With <code>fixed</code> disabled (default):
  //         <br />
  //         <br />
  //         <br />
  //         <PopoverWithState placement="top" />
  //       </ScrollableContainer>

  //       <ScrollableContainer dataHook="story-popover-fixed-enabled">
  //         With <code>fixed</code> enabled:
  //         <br />
  //         <br />
  //         <br />
  //         <PopoverWithState placement="top" fixed />
  //       </ScrollableContainer>
  //     </div>

  //     <div data-hook="story-popover-z-index">
  //       <h2>z-index</h2>
  //       <div style={{ display: 'flex' }}>
  //         <div style={{ position: 'relative' }}>
  //           <p>popover z-index default to 1000 while cover z-index is 2000</p>

  //           <div style={{ position: 'absolute', top: '80px', left: '0px' }}>
  //             <PopoverWithState data-hook="popover-z-index-before-cover" />
  //           </div>
  //           <div
  //             style={{
  //               zIndex: 2000,
  //               position: 'absolute',
  //               top: '80px',
  //               left: '0px',
  //               backgroundColor: 'lightgray',
  //               width: '200px',
  //               height: '50px',
  //             }}
  //           >
  //             cover
  //           </div>
  //         </div>
  //         <div style={{ width: '100px' }}></div>
  //         <div style={{ position: 'relative' }}>
  //           <p>popover z-index is set to 3000 while cover z-index is 2000</p>

  //           <div style={{ position: 'absolute', top: '80px', left: '0px' }}>
  //             <PopoverWithState
  //               data-hook="popover-z-index-after-cover"
  //               zIndex={3000}
  //             />
  //           </div>
  //           <div
  //             style={{
  //               zIndex: 2000,
  //               position: 'absolute',
  //               top: '80px',
  //               left: '0px',
  //               backgroundColor: 'lightgray',
  //               width: '200px',
  //               height: '50px',
  //             }}
  //           >
  //             cover
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ),
};

// export const hello = () => {
//   const [shown, setShown] = React.useState(true);
//   return (
//     <div data-hook="story-popover-z-index" style={{ height: '50px' }}>
//       <div styles={{ display: 'flex' }}>
//         <div style={{ position: 'relative' }}>
//           <div style={{ position: 'absolute', top: '10px', left: '0px' }}>
//             <Popover
//               shown={shown}
//               fixed={true}
//               onClick={() => setShown(!shown)}
//               placement="top"
//               showArrow
//             >
//               <Popover.Element>The Element</Popover.Element>
//               <Popover.Content>The content</Popover.Content>
//             </Popover>
//           </div>
//           <div
//             style={{
//               zIndex: 2000,
//               position: 'absolute',
//               top: '0px',
//               left: '0px',
//               backgroundColor: 'lightgray',
//               width: '200px',
//               height: '50px',
//             }}
//           >
//             cover
//           </div>
//         </div>
//         <div style={{ position: 'relative' }}>
//           <div style={{ position: 'absolute', top: '10px', left: '0px' }}>
//             <Popover
//               shown={shown}
//               fixed={true}
//               onClick={() => setShown(!shown)}
//               placement="top"
//               showArrow
//             >
//               <Popover.Element>The Element</Popover.Element>
//               <Popover.Content>The content</Popover.Content>
//             </Popover>
//           </div>
//           <div
//             style={{
//               zIndex: 2000,
//               position: 'absolute',
//               top: '0px',
//               left: '0px',
//               backgroundColor: 'lightgray',
//               width: '200px',
//               height: '50px',
//             }}
//           >
//             cover
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
