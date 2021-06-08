import * as React from 'react';
import { DemoSection } from '../../typings/story-section';
import styles from '../styles.scss';

export const demo = (props: DemoSection) => {
  const DemoComponent = props.component;

  return (
    <div className={styles.demo}>
      {typeof DemoComponent === 'function' ? <DemoComponent /> : DemoComponent}
    </div>
  );
};
