import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/dist/src/CodeShowcase/CodeShowcase';
import ComponentSource from 'wix-storybook-utils/ComponentSource';
import {Select, Option} from '../src/components/select';
import {Menu} from '../src/components/select/menu';
import {Input} from '../src/components/Input';
import Heading from 'wix-style-react/Heading';

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
  componentPath: '../src/components/select',
  componentProps: {},

  examples: (
    <div>
      Just a menu:
      <Menu>
        {items.map(item => (
          <Menu.Item {...item}>{item.value}</Menu.Item>
        ))}
      </Menu>
      <hr />
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
