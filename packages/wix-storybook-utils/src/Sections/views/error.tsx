import * as React from 'react';

import { ErrorSection } from '../../typings/story-section';

import styles from './styles.scss';

export const error: (a: ErrorSection) => React.ReactNode = section => (
  <div className={styles.errorSection}>
    <h4>Invalid section configuration</h4>

  <p>
    The following configuration is not supported:
  </p>

    <pre>{JSON.stringify(section, null, 2)}</pre>
  </div>
);
