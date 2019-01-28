import * as React from 'react';

import { StoryConfig } from '../typings/story-config';
import { tab } from './views/tab';
import { tab as makeTab } from './';

const styles = require('./styles.scss');

const Header = ({ storyName, metadata }) => (
  <div>
    <div className={styles.title}>{storyName}</div>
    {metadata.displayName && (
      <div className={styles.subtitle}>{`<${metadata.displayName}/>`}</div>
    )}
  </div>
);

export const View: React.StatelessComponent<StoryConfig> = storyConfig => (
  <div className={styles.container}>
    <Header storyName={storyConfig.storyName} metadata={storyConfig.metadata} />
    {tab(
      makeTab({
        sections: storyConfig.sections,
      }),
      storyConfig,
    )}
  </div>
);
