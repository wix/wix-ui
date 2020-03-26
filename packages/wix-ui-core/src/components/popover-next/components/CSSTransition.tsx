import * as React from 'react';
import { CSSTransition as Transition } from 'react-transition-group';
import styles from '../../popover/Popover.st.css';

export const CSSTransition = props => {
  const { shown, timeout, children, onAnimationExit } = props;

  return (
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
      onExited={onAnimationExit}
    >
      {children}
    </Transition>
  );
};
