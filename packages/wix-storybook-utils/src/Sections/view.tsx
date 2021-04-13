import * as React from 'react';

import { StoryConfig } from '../typings/story-config';
import { tab } from './views/tab';
import { tab as makeTab } from '.';
import { SectionType } from '../typings/story-section';

import styles from './styles.scss';
import { storyPage } from './views/story-page';

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

export const View: React.FunctionComponent<StoryConfig> = storyConfig => {
  if (storyConfig.story) {
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          {storyPage(
            {
              type: SectionType.StoryPage,
              content: storyConfig.story.content,
              examples: storyConfig.story.examples,
            },
            storyConfig,
          )}
        </div>
      </div>
    );
  }

  return (
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
};
