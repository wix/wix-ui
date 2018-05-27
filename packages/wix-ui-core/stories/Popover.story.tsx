import * as React from 'react';
import {Popover} from '../src/components/Popover';
import {Option} from '../src/baseComponents/DropdownOption';

const exampleMargin = '50px';

class MultiplePopoverExample extends React.Component<{},{open1:boolean}> {
  state= {open1:true}

  render() {
    return (
      <div>
        <div>
          <button onClick={()=>this.setState({open1:false})}> click to close 1 </button>
        </div>
        <div>
          <Popover
              shown={this.state.open1}
              placement="right"
              appendTo="window"
              data-hook="storybook-popover-example-1"
              showArrow
              timeout={150}
              >
              <Popover.Element>
                <div>element1</div>
              </Popover.Element>
              <Popover.Content>
                <div>content1</div>
              </Popover.Content>
            </Popover>
          </div>
          <div>
            <Popover
              shown={true}
              placement="right"
              appendTo="window"
              data-hook="storybook-popover-example-2"
              showArrow
              timeout={150}
              >
              <Popover.Element>
                <div>element2</div>
              </Popover.Element>
              <Popover.Content>
                <div>content2</div>
              </Popover.Content>
            </Popover>
          </div>
        </div>
    );
  }
}


export default {
  category: 'Components',
  storyName: 'Popover',
  component: Popover,
  componentPath: '../src/components/Popover/Popover.tsx',
  componentProps: {
    'data-hook': 'storybook-popover',
    children: [<Popover.Element key="1">element</Popover.Element>, <Popover.Content key="2">Content</Popover.Content>],
    appendTo: 'window', //null, 'scrollParent', 'viewport'
    // shown: true,
    showArrow: true,
    timeout: 150
  },
  examples: (
    <div>
      <h1>Examples2</h1>
      <div style={{marginTop: exampleMargin, marginBottom: exampleMargin}}>
        <MultiplePopoverExample/>
      </div>
    </div>
  )
};

