import {createElement} from 'react';

import styles from './styles.scss';

export default props =>
  createElement('input', {
    className: styles.input,
    ...props
  });
