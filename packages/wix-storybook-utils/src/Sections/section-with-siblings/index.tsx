import * as React from 'react';

import {
  Section,
  SectionType,
  ImportExampleSection,
} from '../../typings/story-section';
import Markdown from '../../Markdown';

import styles from './styles.scss';
import { AnchoredTitle } from '../../AnchoredTitle';

export const SIBLINGS = ['pretitle', 'title', 'subtitle', 'description'];
const SECTIONS_WITHOUT_SIBLINGS = [
  SectionType.Title,
  SectionType.Header,
  SectionType.Example,
];

const sectionPrepares = {
  [SectionType.ImportExample]: (section: ImportExampleSection) => ({
    ...section,
    title: section.title || 'Import',
  }),
};

const prepareSection = (section: Section) => {
  const preparedSection = (
    sectionPrepares[section.type] || ((i: unknown) => i)
  )(section);

  const siblingsWithDiv = SIBLINGS.filter(
    sibling => preparedSection[sibling],
  ).reduce(
    (sections, key) => ({
      ...sections,
      [key]: (
        <Markdown
          key={key}
          className={styles[key]}
          source={preparedSection[key]}
        />
      ),
    }),
    {},
  );

  return { ...preparedSection, ...siblingsWithDiv };
};

export const sectionWithSiblings = (
  section: Section,
  children: React.ReactNode,
  isAnchored?: boolean,
) => {
  const preparedSection = prepareSection(section);
  const siblings = SIBLINGS.filter(row => preparedSection[row]);
  const shouldShowSiblings =
    siblings.length > 0 && !SECTIONS_WITHOUT_SIBLINGS.includes(section.type);

  return (
    <div data-hook={section.dataHook || null}>
      {shouldShowSiblings ? (
        <div className={styles.titles}>
          {isAnchored ? (
            <AnchoredTitle title={section.title} />
          ) : (
            siblings.map(row => preparedSection[row])
          )}
        </div>
      ) : null}

      {children}
    </div>
  );
};
