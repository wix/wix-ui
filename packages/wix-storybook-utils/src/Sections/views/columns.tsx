import * as React from 'react';
import { ColumnsSection } from '../../typings/story-section';
import { getView } from './tab';

const { Layout, Cell } = require('../../ui/Layout');

export const columns: (a: ColumnsSection) => React.ReactNode = ({ items }) => {
  if (!items.length) {
    return null;
  }

  const children = items.map((column, i) => (
    <Cell span={1} key={`cell-${i}`}>
      {getView(column.type)(column)}
    </Cell>
  ));
  return <Layout cols={items.length}>{children}</Layout>;
};
