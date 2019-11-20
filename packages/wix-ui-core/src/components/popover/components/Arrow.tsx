import * as React from 'react';
import styles from '../Popover.st.css';

import { getArrowShift } from '../utils/getArrowShift';

const Arrow = props => {
  const { arrowProps, moveArrowTo, placement, customArrow } = props;

  const commonProps = {
    ref: arrowProps.ref,
    key: 'popover-arrow',
    'data-hook': 'popover-arrow',
    style: {
      ...arrowProps.style,
      ...getArrowShift(moveArrowTo, placement)
    }
  };

  if (customArrow) {
    return customArrow(placement, commonProps);
  }

  return <div {...commonProps} className={styles.arrow} />;
};

export default Arrow;
