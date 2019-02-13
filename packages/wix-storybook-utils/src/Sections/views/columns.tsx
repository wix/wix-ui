import * as React from 'react';
import { ColumnsSection } from '../../typings/story-section';
import { getView } from './tab';
import { isTab } from '../extract-tabs';
import { tabWithSiblings } from '../common';

const styles = require('./styles.scss');

const renderColumn = column => {
  const view = getView(column.type)(column);
  return isTab(column) ? view : tabWithSiblings(column, view);
};

export const columns: (a: ColumnsSection) => React.ReactNode = ({ items }) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className={styles.layout}>
      {items.map((column, i) => (
        <div key={`col-${i}`}>{renderColumn(column)}</div>
      ))}
    </div>
  );
};
