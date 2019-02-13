import * as React from 'react';

const styles = require('./styles.scss');

export const tabWithSiblings = (section, children) => (
  <div>
    {['pretitle', 'title', 'subtitle', 'description']
      .filter(row => section[row])
      .map(row => (
        <div key={row} className={styles[`section-${row}`]}>
          {section[row]}
        </div>
      ))}
    {children}
  </div>
);
