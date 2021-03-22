import * as React from 'react';
import addons from '@storybook/addons';

import {
  Section,
  SectionType,
  ImportExampleSection,
} from '../../typings/story-section';
import Markdown from '../../Markdown';

import styles from './styles.scss';

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

const renderSibling = props => (
  <Markdown
    key={props.key}
    className={styles[props.key]}
    source={props.source}
  />
);

const renderAnchoredSibling = (props) => {
  const id = props.source.replace(/\s+/g, '_');
  return (
    <a id={id} href={`#${id}`} target="_self" onClick={(event) => {
      event.preventDefault();
      addons.getChannel().emit('navigateUrl', `#${id}`);
    }}>
      {renderSibling(props)}
    </a>
  )
}

const SECTIONS_SIBLINGS = {
  subtitle: renderSibling,
  description: renderSibling,
  pretitle: renderSibling,
  title: props => props.isAnchored ? renderAnchoredSibling(props) : renderSibling(props),
};

const prepareSection = (section: Section, isAnchored: boolean) => {
  const preparedSection = (
    sectionPrepares[section.type] || ((i: unknown) => i)
  )(section);
  const siblingsWithDiv = SIBLINGS.filter(
    sibling => preparedSection[sibling],
  ).reduce(
    (sections, key) => ({
      ...sections,
      [key]: SECTIONS_SIBLINGS[key]({
        key,
        source: preparedSection[key],
        isAnchored,
      }),
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
  const preparedSection = prepareSection(section, isAnchored);
  const siblings = SIBLINGS.filter(row => preparedSection[row]);
  const shouldShowSiblings =
    siblings.length > 0 && !SECTIONS_WITHOUT_SIBLINGS.includes(section.type);

  return (
    <div data-hook={section.dataHook || null}>
      {shouldShowSiblings ? (
        <div className={styles.titles}>
          {siblings.map(row => preparedSection[row])}
        </div>
      ) : null}

      {children}
    </div>
  );
};
