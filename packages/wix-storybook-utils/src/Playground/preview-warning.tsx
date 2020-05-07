import React from 'react';

import styles from './styles.scss';

export const previewWarning = ({ onConfirm }) => (
  <div className={styles.previewWarning}>
    <h3>Warning!</h3>
    <p>We are about to run downloaded code.</p>
    <p>This can be dangerous!</p>
    <button className={styles.previewConfirmButton} onClick={onConfirm}>
      Code looks okay, run it
    </button>
  </div>
);
