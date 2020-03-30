import * as React from 'react';
import classNames from 'classnames';
import { Modifiers } from 'popper.js';

import { Popper as ReactPopper, PopperChildrenProps } from 'react-popper';
import { PopoverNextProps } from '../popover-next-next';

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

export interface PopperProps {
  dataHook: string;
  placement: any;
  contentHook: string;
  grabScheduleUpdater(scheduler: PopperChildrenProps['scheduleUpdate']): void;
  modifiers: Modifiers;
  arrowOptions: {
    showArrow?: PopoverNextProps['showArrow'];
    moveArrowTo?: PopoverNextProps['moveArrowTo'];
    customArrow?: PopoverNextProps['customArrow'];
  };
  accesibilityOptions: {
    role?: string;
    id?: string;
  };
}

const Popper: React.FC<PopperProps> = ({
  dataHook,
  placement,
  contentHook,
  grabScheduleUpdater,
  children,
  accesibilityOptions,
  arrowOptions,
  modifiers,
}) => {
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
            data-hook={dataHook}
            className={classNames(styles.popover, {
              [styles.withArrow]: arrowOptions.showArrow,
              [styles.popoverContent]: !arrowOptions.showArrow,
            })}
            data-content-element={contentHook}
            data-placement={popperPlacement || placement}
            style={style}
          >
            {arrowOptions.showArrow && (
              <Arrow
                arrowProps={arrowProps}
                moveArrowTo={arrowOptions.moveArrowTo}
                placement={popperPlacement || placement}
                customArrow={arrowOptions.customArrow}
              />
            )}
            <div
              id={accesibilityOptions.id}
              role={accesibilityOptions.role}
              className={arrowOptions.showArrow ? styles.popoverContent : ''}
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
