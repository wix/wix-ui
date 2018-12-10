import * as React from 'react';

import { StoryConfig } from '../typings/story-config';

import { tab } from './views/tab';

const styles = require('./styles.scss');

export const View: React.StatelessComponent<StoryConfig> = ({
  sections,
  storyName,
  metadata,
}) => (
  <div>
    <div>
      <div className={styles.title}>{storyName}</div>
      {metadata.displayName && (
        <div className={styles.subtitle}>{`<${metadata.displayName}/>`}</div>
      )}
    </div>

    {tab(sections)}
  </div>
);
