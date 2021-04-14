import * as React from 'react';
import { DemoSection } from '../../typings/story-section';
import styles from '../styles.scss';

export const demo: (props: DemoSection) => React.ReactNode = ({ demo }) => (
  <div className={styles.demo}>{demo}</div>
);
