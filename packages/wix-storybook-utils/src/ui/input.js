import { createElement } from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

export default props =>
  createElement('input', {
    ...props,
    className: classnames(styles.input, props.className),
  });
