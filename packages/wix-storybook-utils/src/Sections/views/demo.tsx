import * as React from 'react';
import { DemoSection } from '../../typings/story-section';
import { sectionWithSiblings } from '../section-with-siblings';
import { demo as demoConfig } from '../';
import styles from '../styles.scss';

const demoView = (props: DemoSection) => (
  <div className={styles.demo}>{props.demo}</div>
);

export const demo = (props: DemoSection) => (
  <>
    {sectionWithSiblings(
      demoConfig({
        title: props.title || 'Demo',
      }),
      demoView(props),
      true,
    )}
  </>
);
