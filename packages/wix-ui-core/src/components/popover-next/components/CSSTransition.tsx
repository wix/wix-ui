import * as React from 'react';
import { CSSTransition as Transition } from 'react-transition-group';
import styles from '../../popover/Popover.st.css';

const CSSTransition = props => {
  const { shown, timeout, children, shouldAnimate, detachStyles } = props;

  return shouldAnimate ? (
    <Transition
      in={shown}
      timeout={timeout}
      unmountOnExit
      classNames={{
        enter: styles['popoverAnimation-enter'],
        enterActive: styles['popoverAnimation-enter-active'],
        exit: styles['popoverAnimation-exit'],
        exitActive: styles['popoverAnimation-exit-active'],
      }}
      onExited={detachStyles}
    >
      {children}
    </Transition>
  ) : (
    children
  );
};

export default CSSTransition;
