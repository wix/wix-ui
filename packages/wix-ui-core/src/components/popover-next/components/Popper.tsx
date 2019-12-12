import * as React from 'react';
import classNames from 'classnames';

import { Loadable } from '../../loadable';

import { getModifiers } from '../utils/getModifiers';

import CSSTransitionWrapper from './CSSTransitionWrapper';
import PortalWrapper from './PortalWrapper';
import styles from '../../popover/Popover.st.css';

import Arrow from './Arrow';

class LoadablePopper extends Loadable<{
  Popper: React.ComponentType<any>;
  CSSTransition: React.ComponentType<any>;
  Portal: React.ComponentType<any>;
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
    onLoad,
    portalNode,
  } = props;

  return (
    <LoadablePopper
      loader={{
        Popper:
          // because variables are not parsed by webpack transpiler
          process.env.NODE_ENV === 'test' ||
          process.env.NODE_ENV === 'development'
            ? () => require('react-popper')
            : () => import('react-popper'),
        CSSTransition:
          // because variables are not parsed by webpack transpiler
          process.env.NODE_ENV === 'test' ||
          process.env.NODE_ENV === 'development'
            ? () => require('react-transition-group')
            : () => import('react-transition-group'),
        Portal:
          // because variables are not parsed by webpack transpiler
          process.env.NODE_ENV === 'test' ||
          process.env.NODE_ENV === 'development'
            ? () => require('react-portal')
            : () => import('react-portal'),
      }}
      defaultComponent={<div />}
      namedExports={{
        Popper: 'Popper',
        CSSTransition: 'CSSTransition',
        Portal: 'Portal',
      }}
      onLoad={onLoad}
      shouldLoadComponent
    >
      {({ Popper: ReactPopper, CSSTransition, Portal }) => (
        <PortalWrapper Component={Portal} portalNode={portalNode}>
          <CSSTransitionWrapper Component={CSSTransition} {...props}>
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
          </CSSTransitionWrapper>
        </PortalWrapper>
      )}
    </LoadablePopper>
  );
};

export default Popper;
