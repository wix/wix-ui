import * as React from 'react';
import classNames from 'classnames';

import { Popper as ReactPopper, PopperChildrenProps } from 'react-popper';
import { PopoverNextProps } from '../popover-next';

import {
  getModifiers,
  ModifiersParams,
} from '../../popover/utils/getModifiers';
import { getArrowShift } from '../../popover/utils/getArrowShift';

import { classes } from '../../popover/Popover.st.css';

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

  return <div {...commonProps} className={classes.arrow} />;
};

export type PopperProps = ModifiersParams &
  Pick<
    PopoverNextProps,
    | 'maxWidth'
    | 'showArrow'
    | 'zIndex'
    | 'moveArrowTo'
    | 'customArrow'
    | 'id'
    | 'role'
  > & {
    contentHook?: string;
    grabScheduleUpdater(scheduler: PopperChildrenProps['scheduleUpdate']): void;
  };

const Popper: React.FC<PopperProps> = ({
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
  shouldAnimate,
  width,
  moveBy,
  appendTo,
  flip,
  fixed,
  minWidth,
  dynamicWidth,
  isTestEnv,
}) => {
  const modifiers = getModifiers({
    shouldAnimate,
    width,
    moveBy,
    appendTo,
    flip,
    fixed,
    placement,
    isTestEnv,
    minWidth,
    dynamicWidth,
  });
  return (
    <ReactPopper modifiers={modifiers} placement={placement}>
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
            className={classNames(classes.popover, {
              [classes.withArrow]: showArrow,
              [classes.popoverContent]: !showArrow,
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
              className={showArrow ? classes.popoverContent : ''}
            >
              {children}
            </div>
          </div>
        );
      }}
    </ReactPopper>
  );
};

export default Popper;
