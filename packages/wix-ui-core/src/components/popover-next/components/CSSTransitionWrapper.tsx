import * as React from 'react';
import styles from '../popover-next.st.css';

const CSSTransitionWrapper = props => {
  const {
    Component,
    shown,
    timeout,
    children,
    shouldAnimate,
    detachSyles,
  } = props;

  return shouldAnimate ? (
    <Component
      in={shown}
      timeout={timeout}
      unmountOnExit
      classNames={{
        enter: styles['popoverAnimation-enter'],
        enterActive: styles['popoverAnimation-enter-active'],
        exit: styles['popoverAnimation-exit'],
        exitActive: styles['popoverAnimation-exit-active'],
      }}
      onExited={detachSyles}
    >
      {children}
    </Component>
  ) : (
    children
  );
};

export default CSSTransitionWrapper;
