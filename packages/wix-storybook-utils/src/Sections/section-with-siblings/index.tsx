import * as React from 'react';

import { SectionType } from '../../typings/story-section';

import styles from './styles.scss';

const SIBLINGS = ['pretitle', 'title', 'subtitle', 'description'];
const SECTIONS_WITHOUT_SIBLINGS = [SectionType.Title];

const sectionPrepares = {
  [SectionType.ImportExample]: section => ({
    ...section,
    title: section.title && section.title.length ? section.title : 'Import',
  }),
};

const prepareSection = section => {
  const preparedSection = (sectionPrepares[section.type] || (i => i))(section);

  const siblingsWithDiv = SIBLINGS.filter(
    sibling => preparedSection[sibling],
  ).reduce(
    (sections, key) => ({
      ...sections,
      [key]: (
        <div
          key={key}
          className={styles[key]}
          children={preparedSection[key]}
        />
      ),
    }),
    {},
  );

  return { ...preparedSection, ...siblingsWithDiv };
};

export const sectionWithSiblings = (section, children) => {
  const preparedSection = prepareSection(section);
  const siblings = SIBLINGS.filter(row => preparedSection[row]);
  const shouldShowSiblings =
    siblings.length > 0 && !SECTIONS_WITHOUT_SIBLINGS.includes(section.type);

  return (
    <div>
      {shouldShowSiblings ? (
        <div className={styles.titles}>
          {siblings.map(row => preparedSection[row])}
        </div>
      ) : null}

      {children}
    </div>
  );
};
