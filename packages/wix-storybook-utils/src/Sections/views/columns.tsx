import * as React from 'react';
import { ColumnsSection } from '../../typings/story-section';
import { getView } from './tab';

const { Layout, Cell } = require('../../ui/Layout');

export const columns: (a: ColumnsSection) => React.ReactNode = ({ items }) => {
  if (!items.length) {
    return null;
  }

  const span = items.length <= 12 ? 12 / items.length : 1;
  const children = items.map(column => (
    <Cell span={span}>{getView(column.type)(column)}</Cell>
  ));
  return <Layout>{children}</Layout>;
};
