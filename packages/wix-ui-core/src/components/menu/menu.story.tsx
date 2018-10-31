import * as React from 'react';
import {Menu} from './menu';
 import backofficeTheme from './menu.st.css';
 const exampleChildren = [
  {
    label: 'Four items',
    value: [
      <Menu.Item children="first" key="first" />,
      <Menu.Item children="second" key="second" />,
      <Menu.Item children="third" key="third" />,
      <Menu.Item children="fourth" key="fourth" />
    ]
  },
  {
    label: 'Two items',
    value: [
      <Menu.Item children="first" key="first" />,
      <Menu.Item children="second" key="second" />
    ]
  }
];
 export default {
  category: 'Components',
  storyName: 'Menu',
  component: Menu,
  componentPath: './menu.tsx',
   componentProps: {
    children: exampleChildren[0].value
  },
   exampleProps: {
    children: exampleChildren
  },
   examples: (
    <div style={{width: 270}}>
      <Menu>
        <Menu.Item>Item</Menu.Item>
        <Menu.Item selected>Selected Item</Menu.Item>
        <Menu.Item highlighted>Highlighted Item</Menu.Item>
        <Menu.Item disabled>Disabled Item</Menu.Item>
      </Menu>
    </div>
  )
};
