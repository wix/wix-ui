import * as React from 'react';
import { CSSTransition as Transition } from 'react-transition-group';
import { classes } from '../../popover/Popover.st.css';

const CSSTransition = props => {
  const { shown, timeout, children, shouldAnimate, detachStyles } = props;

  return shouldAnimate ? (
    <Transition
      in={shown}
      timeout={timeout}
      unmountOnExit
      classNames={{
        enter: classes['popoverAnimation-enter'],
        enterActive: classes['popoverAnimation-enter-active'],
        exit: classes['popoverAnimation-exit'],
        exitActive: classes['popoverAnimation-exit-active'],
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
