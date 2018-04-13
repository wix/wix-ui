import * as React from 'react';
import {storiesOf} from '@storybook/react';
import onClickOutside, {InjectedOnClickOutProps, OnClickOutProps} from 'react-onclickoutside';

import {Pop, Placement} from '../src/baseComponents/Pop';
import {Input} from '../src/components/Input';

interface Props {
  hide: Function;
}

class Menu extends React.Component<Props & InjectedOnClickOutProps> {
  handleClickOutside() {
    this.props.hide();
  }

  render() {
    return (
      <div
      style = {{
        display: 'inline-block',
        background: 'white',
        padding: '.5em',
        border: '1px solid black'
      }}
      children="Hello menu woo!"
      />
    );
  }
}

const DropdownMenu = onClickOutside(Menu);

export const PopStory = () =>
  <div>
    <h2>popover mechanism to create any kind of popover</h2>

    <Pop
      placement="bottom-start"
      trigger={({toggle}) => <span onClick={toggle}>Click me!</span>}
      menu={({hide}) => <DropdownMenu hide={hide}/>}
      />

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    <Pop
      placement="bottom-start"
      trigger={({show}) => <Input value="hello" onClick={show}/>}
      menu={({hide}) => <DropdownMenu hide={hide}/>}
      />

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    <Pop
      placement="top-start"
      trigger={({show, hide}) =>
        <div
        onMouseOver={show}
        onMouseOut={hide}
        children="hover me for tooltip"
        />
      }
      menu={() =>
        <div
        style={{
          background: 'teal'
        }}
        children="Hello from tooltip!"
        />
      }
    />
  </div>;
