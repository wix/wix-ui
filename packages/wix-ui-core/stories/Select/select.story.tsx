import * as React from 'react';
import {Select, Option} from '../../src/components/select';
import {Input} from '../../src/components/Input';

const menuItems = [
  {id: 0, value: 'first'},
  {id: 1, value: 'second', selected: true},
  {id: 2, value: 'third', disabled: true},
  {id: 3, value: 'fourth'},
  {id: 4, value: 'fifth'},
  {id: 5, value: 'sixth'}
];

const mapItems = items =>
  items.map(item => <Option key={item.id} {...item} children={item.value} />);

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
  storyName: 'Select',
  component: Select,
  componentPath: '../../src/components/select',
  componentProps: {
    selected: [0],
    children: exampleChildren[0].value
  },

  exampleProps: {
    children: exampleChildren
  }
};
