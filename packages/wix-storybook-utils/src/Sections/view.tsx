import * as React from 'react';

import { StoryConfig } from '../typings/story-config';
import { tab } from './views/tab';
import { tab as makeTab } from '.';
import { SectionType } from '../typings/story-section';

const styles = require('./styles.scss');

const Header = ({ storyName, metadata }) => (
  <div className={styles.header
  }>
    <div className={styles.title}>{storyName}</div>
    {
      metadata.displayName && (
        <div className={styles.subtitle}>{`<${metadata.displayName}/>`}</div>
      )
    }
  </div>
);

export const View: React.FunctionComponent<StoryConfig> = storyConfig => {
  const hasHeaders = storyConfig.sections[0] && storyConfig.sections[0].type === SectionType.Header;
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {!hasHeaders && <Header
          storyName={storyConfig.storyName}
          metadata={storyConfig.metadata}
        />}
        {tab(
          makeTab({
            sections: storyConfig.sections,
          }),
          storyConfig,
        )}
      </div>
    </div>
  )
};
