import * as React from 'react';
import {Select, Option} from '../../src/components/select';
import {Input} from '../../src/components/Input';

const items = [
  {id: 0, value: 'first'},
  {id: 1, value: 'second', selected: true},
  {id: 2, value: 'third', disabled: true},
  {id: 3, value: 'fourth'},
  {id: 4, value: 'fifth'},
  {id: 5, value: 'sixth'}
];

export default {
  category: 'Components/Dropdown',
  storyName: 'Select',
  component: Select,
  componentPath: '../../src/components/select',
  componentProps: {},

  examples: (
    <div>
      <Select selected={1}>
        {items.map(item => (
          <Option
            value={item.value}
            key={item.value}
            selected={item.selected}
            disabled={item.disabled}
          >
            {item.value}
          </Option>
        ))}
      </Select>
      <hr />
      <Select
        toggle={({getInputProps, openMenu}) => (
          <Input {...getInputProps()} onFocus={openMenu} />
        )}
      >
        {items.map(item => (
          <Option value={item.value} key={item.value}>
            {item.value}
          </Option>
        ))}
      </Select>
    </div>
  )
};
