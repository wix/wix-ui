import * as React from 'react';
import { DemoSection } from '../../typings/story-section';
import styles from '../styles.scss';

export const demo = (props: DemoSection) => {
  const component =
    typeof props.component === 'function' ? props.component() : props.component;

  return <div className={styles.demo}>{component}</div>;
};
