import * as React from 'react';
import { ColumnsSection } from '../../typings/story-section';
import { getView } from './tab';
import { isTab } from '../extract-tabs';
import { tabWithSiblings } from '../common';

const { Layout, Cell } = require('../../ui/Layout');

const renderColumn = column => {
  const view = getView(column.type)(column);
  return isTab(column) ? view : tabWithSiblings(column, view);
};

export const columns: (a: ColumnsSection) => React.ReactNode = ({ items }) => {
  if (!items.length) {
    return null;
  }

  return (
    <Layout cols={items.length}>
      {items.map((column, i) => (
        <Cell span={1} key={`cell-${i}`}>
          {renderColumn(column)}
        </Cell>
      ))}
    </Layout>
  );
};
