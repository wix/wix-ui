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


export default {
  category: 'Components',
  storyName: 'Popover',
  component: Popover,
  componentPath: '../src/components/Popover/Popover.tsx',
  componentProps: {
    'data-hook': 'storybook-popover',
    children: [
      <Popover.Element key="1">element</Popover.Element>,
      <Popover.Content key="2">Content</Popover.Content>
    ],
    appendTo: null, // window, null, 'scrollParent', 'viewport'
    showArrow: true,
    timeout: 150
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
    </div>
  )
};


