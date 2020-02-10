import * as React from 'react';
import classNames from 'classnames';
import { CSSTransition as Transition } from 'react-transition-group';
import { Popper as ReactPopper } from 'react-popper';

import Portal from './Portal';

import { getModifiers } from '../../popover/utils/getModifiers';
import { getArrowShift } from '../../popover/utils/getArrowShift';

import styles from '../../popover/Popover.st.css';

const Arrow = props => {
  const { arrowProps, moveArrowTo, placement, customArrow } = props;

  const commonProps = {
    ref: arrowProps.ref,
    key: 'popover-arrow',
    'data-hook': 'popover-arrow',
    style: {
      ...arrowProps.style,
      ...getArrowShift(moveArrowTo, placement),
    },
  };

  if (customArrow) {
    return customArrow(placement, commonProps);
  }

  return <div {...commonProps} className={styles.arrow} />;
};

const CSSTransition = props => {
  const { shown, timeout, children, shouldAnimate, detachSyles } = props;
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
      onExited={detachSyles}
    >
      {children}
    </Transition>
  ) : (
    children
  );
};

const Popper = (props: any) => {
  const {
    placement,
    zIndex,
    maxWidth,
    showArrow,
    contentHook,
    moveArrowTo,
    customArrow,
    grabScheduleUpdater,
    children,
    id,
    role,
    portalNode,
  } = props;
  return (
    <Portal node={portalNode}>
      <CSSTransition {...props}>
        <ReactPopper modifiers={getModifiers(props)} placement={placement}>
          {({
            ref,
            style,
            placement: popperPlacement,
            arrowProps,
            scheduleUpdate,
          }) => {
            grabScheduleUpdater(scheduleUpdate);
            return (
              <div
                ref={ref}
                data-hook="popover-content"
                data-content-element={contentHook}
                style={{
                  ...style,
                  top: isNaN(style.top as number) ? 0 : style.top,
                  left: isNaN(style.left as number) ? 0 : style.left,
                  zIndex,
                  maxWidth,
                }}
                data-placement={popperPlacement || placement}
                className={classNames(styles.popover, {
                  [styles.withArrow]: showArrow,
                  [styles.popoverContent]: !showArrow,
                })}
              >
                {showArrow && (
                  <Arrow
                    arrowProps={arrowProps}
                    moveArrowTo={moveArrowTo}
                    placement={popperPlacement || placement}
                    customArrow={customArrow}
                  />
                )}
                <div
                  key="popover-content"
                  id={id}
                  role={role}
                  className={showArrow ? styles.popoverContent : ''}
                >
                  {children}
                </div>
              </div>
            );
          }}
        </ReactPopper>
      </CSSTransition>
    </Portal>
  );
};

export default Popper;
