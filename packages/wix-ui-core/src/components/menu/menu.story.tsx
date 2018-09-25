import * as React from 'react';
import {Menu} from './menu';

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
  }
};
