import * as React from 'react';
import { FieldsDocumentation } from './fields-documentation';

import styles from '../../../Sections/section-with-siblings/styles.scss';

export const flatten = (descriptor, name = '') => {
  return descriptor.reduce((result, item) => {
    const namespace = { ...item, name: `${name}${item.name}` };
    return [
      ...result,
      namespace,
      ...(namespace.type === 'object'
        ? flatten(namespace.props, `${namespace.name}.`)
        : []),
    ];
  }, []);
};

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
