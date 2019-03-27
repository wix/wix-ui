import * as React from 'react';
import {
  DraggableListItem,
  DraggableList,
} from '../src/components/draggable-list';

const items = [1, 2, 3];

export default {
  category: 'Components',
  storyName: 'DraggableList',
  component: DraggableList,
  componentPath: '../src/components/draggable-list/draggable-list.tsx',
  componentProps: {
    children: items.map(el => (
      <DraggableListItem key={el}>Item {el}</DraggableListItem>
    )),
  },
};
