import * as React from 'react';

import { StoryConfig } from '../typings/story-config';
import { tab } from './views/tab';
import { tab as makeTab } from '.';
import { SectionType } from '../typings/story-section';

import styles from './styles.scss';

const Header = ({ storyName, metadata }) => (
  <div className={styles.header}>
    <div className={styles.title}>{storyName}</div>
    {metadata.displayName && (
      <div className={styles.subtitle}>{`<${metadata.displayName}/>`}</div>
    )}
  </div>
);

const hasHeader = (sections = []) =>
  sections[0] && sections[0].type === SectionType.Header;

export const View: React.FunctionComponent<StoryConfig> = storyConfig => (
  <div className={styles.page}>
    <div className={styles.content}>
      {!hasHeader(storyConfig.sections) && (
        <Header
          storyName={storyConfig.storyName}
          metadata={storyConfig.metadata}
        />
      )}

      {tab(
        makeTab({
          sections: storyConfig.sections,
        }),
        storyConfig,
      )}
    </div>
  </div>
);
