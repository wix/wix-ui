import * as React from 'react';
import {Menu} from './menu';

const menuItems = [
  {id: 0, value: 'first'},
  {id: 1, value: 'second', selected: true},
  {id: 2, value: 'third', disabled: true},
  {id: 3, value: 'fourth'},
  {id: 4, value: 'fifth'}
];

const mapItems = items =>
  items.map(item => (
    <Menu.Item key={item.id} {...item} children={item.value} />
  ));

const exampleChildren = [
  {
    label: '1 item',
    value: mapItems(menuItems.slice(0, 1))
  },
  {
    label: '5 items',
    value: mapItems(menuItems)
  }
];

export default {
  category: 'Components/Dropdown',
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
