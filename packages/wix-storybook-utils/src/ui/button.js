import {createElement} from 'react';

import styles from './styles.scss';

export default props =>
  createElement('button', {
    type: 'button',
    className: styles.button,
    ...props
  });
