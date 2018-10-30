import { createElement } from 'react';

import styles from './styles.scss';

export default props =>
  createElement('h2', {
    className: styles.heading,
    ...props,
  });
