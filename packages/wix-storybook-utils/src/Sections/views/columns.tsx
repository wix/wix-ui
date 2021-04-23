import * as React from 'react';
import { ColumnsSection } from '../../typings/story-section';
import { getView } from './tab';
import { isTab } from '../extract-tabs';
import { sectionWithSiblings } from '../section-with-siblings';

import styles from './styles.scss';
import { StoryConfig } from '../../typings/story-config';

const renderColumn = (column, storyConfig) => {
  const view = getView(column.type)(column, storyConfig);
  return isTab(column) ? view : sectionWithSiblings(column, view);
};

export const columns: (a: ColumnsSection, b: StoryConfig) => React.ReactNode = (
  { items },
  storyConfig,
) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className={styles.layout}>
      {items.map((column, i) => (
        <div key={`col-${i}`}>{renderColumn(column, storyConfig)}</div>
      ))}

      {items.length === 1 && <div />}
    </div>
  );
};
