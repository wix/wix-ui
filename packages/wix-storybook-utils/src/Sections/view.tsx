import * as React from 'react';

import { StoryConfig } from '../typings/story-config';
import { tab } from './views/tab';
import { tab as makeTab } from './';

const styles = require('./styles.scss');

export const View: React.StatelessComponent<StoryConfig> = storyConfig => (
  <div>
    <div>
      <div className={styles.title}>{storyConfig.storyName}</div>
      {storyConfig.metadata.displayName && (
        <div className={styles.subtitle}>{`<${
          storyConfig.metadata.displayName
        }/>`}</div>
      )}
    </div>

    {tab(
      makeTab({
        sections: storyConfig.sections,
      }),
      storyConfig,
    )}
  </div>
);
