import * as React from 'react';
import {Select, Option} from '../src/components/Select';
import {Input} from '../src/components/Input';

const items = [
  {value: 'first'},
  {value: 'second', selected: true},
  {value: 'third', disabled: true},
  {value: 'fourth'},
  {value: 'fifth'},
  {value: 'sixth'}
];

export default {
  category: 'Components',
  storyName: 'Select',
  component: Select,
  componentPath: '../src/components/Select',
  componentProps: {},

  examples: (
    <div>
      <Select>
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

      <hr/>

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
