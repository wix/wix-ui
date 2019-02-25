import * as React from 'react';

import { SectionType } from '../../typings/story-section';

import styles from './styles.scss';

const SIBLINGS = ['pretitle', 'title', 'subtitle', 'description'];

const prepares = {
  [SectionType.ImportExample]: section => ({
    ...section,
    title: section.title && section.title.length ? section.title : 'Import',
  }),
};

const prepareSection = section => {
  const preparedSection = (prepares[section.type] || (i => i))(section);

  const siblingsWithDiv = SIBLINGS.filter(
    sibling => preparedSection[sibling],
  ).reduce(
    (withDiv, key) => ({
      ...withDiv,
      [key]: <div className={styles[key]} children={preparedSection[key]} />,
    }),
    {},
  );

  return { ...preparedSection, ...siblingsWithDiv };
};

export const sectionWithSiblings = (section, children) => {
  const preparedSection = prepareSection(section);
  const siblings = SIBLINGS.filter(row => preparedSection[row]);

  return (
    <div>
      {siblings.length > 0 ? (
        <div className={styles.titles}>
          {siblings.map(row => preparedSection[row])}
        </div>
      ) : null}

      {children}
    </div>
  );
};
