import * as React from 'react';
import { ListItem, List } from '../src/components/list';

const items = [1, 2, 3]

export default {
  category: 'Components',
  storyName: 'List',
  component: List,
  componentPath: '../src/components/list/list.tsx',
  componentProps: {
    children: items.map(el => <ListItem key={el}>Item {el}</ListItem>),
  },
};