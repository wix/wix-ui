import * as React from 'react';
import { FieldsDocumentation } from './fields-documentation';
import { flatten } from '../../driver-documentation';

import styles from '../../../Sections/section-with-siblings/styles.scss';

export const API = ({ descriptor, name }) => {
  if (!name || typeof name !== 'string') {
    throw Error('no name - no render');
  }

  const flatDescriptor = flatten(descriptor);
  return (
    <div className={styles.titles}>
      <div className={styles.titles}>
        <div className={styles.title}>Testkit API</div>
      </div>
      <FieldsDocumentation units={flatDescriptor} />
    </div>
  );
};
