import * as React from 'react';
import { ColumnsSection } from '../../typings/story-section';
import { getView } from './tab';

const styles = require('./styles.scss');

export const columns: (a: ColumnsSection) => React.ReactNode = ({ items }) => (
  <div className={styles.columnContainer}>
    {items.map((column, i) => (
      <div className={styles.column} key={`column-${i}`}>
        {getView(column.type)(column)}
      </div>
    ))}
  </div>
);
