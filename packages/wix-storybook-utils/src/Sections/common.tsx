import * as React from 'react';

import styles from '../styles.scss';
import Markdown from '../Markdown';

export const sectionWithTitles = (section, children) => (
  <div>
    {['pretitle', 'title', 'subtitle', 'description']
      .filter(row => section[row])
      .map(row => (
        <div key={row} className={styles[`section-${row}`]}>
          <Markdown source={section[row]} />
        </div>
      ))}
    {children}
  </div>
);
