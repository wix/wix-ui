import * as React from 'react';

import { StoryConfig } from '../typings/story-config';

import { tab } from './views/tab';

const Heading = require('../ui/heading').default;
const styles = require('./styles.scss');

export const View: React.StatelessComponent<StoryConfig> = ({
  sections,
  storyName,
  metadata,
}) => (
  <div>
    <div>
      <div className={styles.title}>
        <Heading>{storyName}</Heading>
      </div>
      {metadata.displayName && (
        <div className={styles.subtitle}>{`<${metadata.displayName}/>`}</div>
      )}
    </div>

    {tab(sections)}
  </div>
);
