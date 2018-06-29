import * as React from 'react';
import {Popover, PopoverProps} from '../src/components/Popover';
import {Option} from '../src/baseComponents/DropdownOption';

// Click target to open close
class PopoverWithState extends React.Component<Partial<PopoverProps>,{shown: boolean}> {
  state = {shown: true};

  render() {
    const props: PopoverProps & {children?: any} = {
      ...this.props,
      placement: 'right',
      showArrow: true,
      shown: this.state.shown,
      onClick:()=> this.setState({shown: !this.state.shown})
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

const children = [
  {label: 'Default example',
    value:
    [
      <Popover.Element key="1">element</Popover.Element>,
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
  componentPath: '../src/components/Popover/Popover.tsx',
  componentProps: {
    'data-hook': 'storybook-popover',
    children: children[0].value,
    appendTo: null,
    showArrow: true,
    timeout: 150,
    shown: false
  },

  exampleProps: {
    children,

    appendTo: [
      {label: 'window', value: window},
      {label: 'scrollParent', value: 'scrollParent'},
      {label: 'viewport', value: 'viewport'},
      {label: 'null', value: null},
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
          If the <em>placement</em> is <code>"top"</code> or <code>"bottom"</code>, <em>x</em> represents offset in the horizontal axis and <em>y</em> in the vertical axis.<br/>
          If the <em>placement</em> is <code>"left"</code> or <code>"right"</code>, <em>x</em> represents offset in the vertical axis and <em>y</em> in the horizontal axis.
        </p>
        <Popover placement='left' shown moveBy={{ x: 50, y: 100 }} showArrow>
          <Popover.Element>
            <div style={{ height: '80px' }}>The element</div>
          </Popover.Element>
          <Popover.Content>
            The content
          </Popover.Content>
        </Popover>
      </div>
    </div>
  )
};
