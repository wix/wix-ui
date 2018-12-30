import * as React from 'react';
import {Popover, PopoverProps} from '../src/components/popover';
import {Option} from '../src/components/dropdown-option';

// Click target to open close
class PopoverWithState extends React.Component<Partial<PopoverProps>,{shown: boolean}> {
  state = {shown: true};

  render() {
    const props: PopoverProps & {children?: any} = {
      placement: 'right',
      showArrow: true,
      shown: this.state.shown,
      onClick:()=> this.setState({shown: !this.state.shown}),
      ...this.props
    }
    return (
      <Popover {...props}>
        <Popover.Element>
          The Element
        </Popover.Element>
        <Popover.Content>
            The content
        </Popover.Content>
      </Popover>
    )
  }
}

const ScrollableContainer = props => (
  <div
    style={{
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
      width: 250,
      margin: 10
    }}
  >
    <div
      data-hook={props.dataHook}
      style={{
        overflow: 'auto',
        height: 100,
      }}
    >
      <div style={{ padding: '25px 25px 80px' }}>
        {props.children}
      </div>
    </div>
  </div>
);

const children = [
  {label: 'Default example',
    value:
    [
      <Popover.Element key="1">This is the Popover.Element</Popover.Element>,
      <Popover.Content key="2">Content</Popover.Content>
    ]
  },
  {label: 'Long content example',
    value: [
      <Popover.Element key="1">Long content Popover</Popover.Element>,
      (
        <Popover.Content key="2">
          Lorem autem ipsam eveniet atque officiis Facere voluptatem eius vitae distinctio dolorem
          quo eveniet? Adipisci hic ut adipisci architecto sunt
        </Popover.Content>
      )
    ]
  }
];

export default {
  category: 'Components',
  storyName: 'Popover',
  component: Popover,
  componentPath: '../src/components/popover/Popover.tsx',
  componentProps: {
    'data-hook': 'storybook-popover',
    children: children[0].value,
    appendTo: 'window',
    showArrow: true,
    timeout: 150,
    shown: false,
    placement: 'top'
  },

  exampleProps: {
    children,
    onClickOutside: () => 'onClickOutside called!',

    appendTo: [
      {label: 'window', value: window},
      {label: 'scrollParent', value: 'scrollParent'},
      {label: 'viewport', value: 'viewport'},
      {label: 'parent', value: 'parent'},
      {label: 'null', value: null},
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
      'left-start'
    ]
  },

  examples: (
    <div>
      <h1>Examples</h1>
      <p>The examples here have a wrapping component with open/close state. Click the target or the content to toggle open/close</p>
      <div>
        <h2>AppendTo = 'window'</h2>
        <p>If you inspect the content, you'll see it is attached to a new div under the body.</p>
        <PopoverWithState appendTo="window" data-hook="popover-appendto-window"/>
      </div>
      <div>
        <h2>AppendTo = 'scrollParent'</h2>
        <p>If you inspect the content, you'll see it is attached to a new div under the list container.</p>
        <div style={{overflow: 'auto', height: '100px', width: '400px', border: '1px solid black'}}>
          <ul>
            <li>item</li>
            <PopoverWithState appendTo="scrollParent" data-hook="popover-appendto-scroll-parent"/>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>moveBy={'{x:50, y:100}'}</h2>
        <p>
          <em>x</em> and <em>y</em> axis orientation is relative to the placement of the popover.<br/>

          <br/>

          The <code>flip</code> behaviour is disabled when this props is used, in order to support
          negative values when making the<br/>
          Content element (<code>{`<Popover.Content/>`}</code>) intentionally overlapping the Target
          element (<code>{`<Popover.Element/>`}</code>).
        </p>
        <Popover placement="right" shown moveBy={{ x: 50, y: 100 }} showArrow>
          <Popover.Element>
            <div style={{ height: '80px' }}>The element</div>
          </Popover.Element>
          <Popover.Content>
            The content
          </Popover.Content>
        </Popover>
      </div>

      <div>
        <h2>Delays</h2>
        <p>
          You can set the <code>hideDelay</code> and <code>showDelay</code> props in order to delay
          the popover's enterance. Value is in <em>milliseconds</em>.

          <br/>

          The following example sets <code>hideDelay</code> and <code>showDelay</code> to &nbsp;
          <code>1000</code> (1 second).

          <br/>

          You can click the popover in order to change its <code>shown</code> state.
        </p>

        <br/>

        <PopoverWithState showDelay={1000} hideDelay={1000} />
      </div>

      <div data-hook="story-popover-flip-behaviour">
        <h2>Flip behaviour</h2>
        <p>
          This behaviour used to flip the <code>{`<Popover/>`}</code>'s placement
          when it starts to overlap the target element (<code>{`<Popover.Element/>`}</code>).
          <br/>
          It is enabled by default.
        </p>

        <br/>

        <ScrollableContainer dataHook="story-popover-flip-enabled">
          With <code>flip</code> enabled (default):<br/><br/><br/>
          <PopoverWithState placement="top" />
        </ScrollableContainer>

        <ScrollableContainer dataHook="story-popover-flip-disabled">
          With <code>flip</code> disabled:<br/><br/><br/>
          <PopoverWithState placement="top" flip={false} />
        </ScrollableContainer>
      </div>

      <div data-hook="story-popover-fixed-behaviour">
        <h2>Fixed behaviour</h2>
        <p>
          This behaviour used to keep the <code>{`<Popover/>`}</code> in it's original
          placement.<br/> By default this behaviour is <b>disabled</b>, and the &nbsp;
          <code>{`<Popover/>`}</code> will change it's position when it'll being positioned outside<br/>
          the boundary (the boundry is the value of the <code>appendTo</code> prop).
          <br/>
        </p>

        <br/>

        <ScrollableContainer dataHook="story-popover-fixed-disabled">
          With <code>fixed</code> disabled (default):<br/><br/><br/>
          <PopoverWithState placement="top" />
        </ScrollableContainer>

        <ScrollableContainer dataHook="story-popover-fixed-enabled">
          With <code>fixed</code> enabled:<br/><br/><br/>
          <PopoverWithState placement="top" fixed />
        </ScrollableContainer>
      </div>
    </div>
  )
};
