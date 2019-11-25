import * as React from 'react';
import classNames from 'classnames';

import { Loadable } from '../../loadable';
import Arrow from './Arrow';

import { getModifiers } from '../utils/getModifiers';
import styles from '../Popover.st.css';

class LoadablePopper extends Loadable<{
  Popper: React.ComponentType<any>;
  CSSTransition: React.ComponentType<any>;
}> {}

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
    shown,
    timeout,
    detachSyles,
    shouldAnimate,
  } = props;

  return (
    <LoadablePopper
      loader={{
        Popper:
          process.env.NODE_ENV === 'test' ||
          process.env.NODE_ENV === 'development'
            ? () => require('react-popper')
            : () => import('react-popper'),
        CSSTransition:
          process.env.NODE_ENV === 'test' ||
          process.env.NODE_ENV === 'development'
            ? () => require('react-transition-group')
            : () => import('react-transition-group'),
      }}
      defaultComponent={<div />}
      namedExports={{ Popper: 'Popper', CSSTransition: 'CSSTransition' }}
      shouldLoadComponent
    >
      {({ Popper: ReactPopper, CSSTransition }) => {
        const popper = (
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
                    top: isNaN(style.top) ? 0 : style.top,
                    left: isNaN(style.left) ? 0 : style.left,
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
        );

        return shouldAnimate
          ? animationWrapper(CSSTransition, {
              shown,
              timeout,
              detachSyles,
              children: popper,
            })
          : popper;
      }}
    </LoadablePopper>
  );
};

export default Popper;

const animationWrapper = (
  CSSTransition,
  { shown, timeout, detachSyles, children }
) => (
  <CSSTransition
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
  </CSSTransition>
);
