import * as React from 'react';
import {Select, Option} from './';
import {Input} from '../Input';

import styles from './select-story.st.css';

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
  componentPath: './',
  componentProps: {
    selected: [0],
    children: exampleChildren[0].value
  },

  exampleProps: {
    children: exampleChildren
  },

  examples: (
    <div className={styles.root}>
      <h3>Simple Dropdown</h3>
      <Select>{mapItems(menuItems)}</Select>
      <hr />

      <h3>Input Dropdown</h3>
      <Select toggle={({getInputProps}) => <Input {...getInputProps()} />}>
        {mapItems(menuItems)}
      </Select>
    </div>
  )
};
