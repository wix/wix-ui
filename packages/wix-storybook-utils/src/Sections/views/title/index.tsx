import * as React from 'react';

import { StoryConfig } from '../../../typings/story-config';
import { TitleSection } from '../../../typings/story-section';

import styles from './styles.scss';

export const title: (
  a: TitleSection,
  b: StoryConfig,
) => React.ReactNode = section => (
  <h2 className={styles.root}>{section.title}</h2>
);
