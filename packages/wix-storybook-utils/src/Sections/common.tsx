import * as React from 'react';

import styles from './styles.scss';
import Markdown from '../Markdown';
import { SectionType } from '../typings/story-section';

const preparators = {
  [SectionType.ImportExample]: section => ({
    ...section,
    title: section.title && section.title.length ? section.title : '### Import',
  }),
};

const prepareSection = section => {
  const preparator = preparators[section.type];
  return preparator ? preparator(section) : section;
};

export const sectionWithTitles = (section, children) => {
  const preparedSection = prepareSection(section);

  return (
    <div>
      {['pretitle', 'title', 'subtitle', 'description']
        .filter(row => preparedSection[row])
        .map(row => (
          <div key={row} className={styles[`preparedSection-${row}`]}>
            <Markdown source={preparedSection[row]} />
          </div>
        ))}
      {children}
    </div>
  );
};
