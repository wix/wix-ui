import * as React from 'react';

import { StoryConfig } from '../../typings/story-config';
import { DividerSection } from '../../typings/story-section';

import styles from '../styles.scss';

export const divider: (a: DividerSection, b: StoryConfig) => React.ReactNode = (
  section,
  storyConfig,
) => <div className={styles.divider} />;
