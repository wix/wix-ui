import * as React from 'react';
import * as classNames from 'classnames';
import PopperJS from 'popper.js';
import style from './Popover.st.css';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {CSSTransition} from 'react-transition-group';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import {oneOf} from 'prop-types';

export type Placement = PopperJS.Placement;
export const PlacementPropType = oneOf(['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']);

export interface PopoverProps {
  /** The location to display the content */
  placement: Placement;
  /** Is the content shown or not */
  shown: boolean;
  /** onClick on the component */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** onMouseEnter on the component */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** onMouseLeave on the component */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /** onKeyDown on the target component */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Show show arrow from the content */
  showArrow?: boolean;
  /** Moves poppover relative to the parent */
  moveBy?: {x: number, y: number};
  /** Fade Delay */
  hideDelay?: number;
  /** Show Delay */
  showDelay?: number;
  /** Moves arrow by amount */
  moveArrowTo?: number;
  /** Enables calculations in relation to a dom element */
  appendTo?: React.ReactNode;
  /** Enables calculations in relation to the parent element*/
  appendToParent?: boolean;
  /** Animation timer */
  timeout?: number;
}

export type PopoverType = React.SFC<PopoverProps> & {
  Element?: React.SFC;
  Content?: React.SFC;
};

const Animation = ({inProp, children, timeout = 150}) =>
  <CSSTransition in={inProp} timeout={timeout} unmountOnExit={true} classNames={style.popoverAnimation}>
      {children}
  </CSSTransition>;

const getArrowShift = (shift, direction) => {
  if (!shift) {
    return {};
  }

  return {
    [direction === 'top' || direction === 'bottom' ? 'left' : 'top']: `${shift}px`
  };
};

/**
 * Popover
 */

export const Popover: PopoverType = props => {
  const {placement, shown, onMouseEnter, onMouseLeave, onKeyDown, onClick, showArrow,
         children, moveBy, moveArrowTo, timeout, appendToParent, appendTo}  = props;
  const childrenObject = buildChildrenObject(children, {Element: null, Content: null});

  const target = appendToParent ? null : appendTo  || null;

  const modifiers = {
    offset: {
      offset: `${moveBy ? moveBy.y : 0}px, ${moveBy ? moveBy.x : 0}px`
    }
  };

  if (target) {
    modifiers['preventOverflow'] = {
      boundariesElement: target
    };
  }

  return (
    <Manager
      {...style('root', {}, props)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <Target onKeyDown={onKeyDown} data-hook="popover-element">
        {childrenObject.Element}
      </Target>
      <Animation inProp={shown} timeout={timeout}>
        <Popper
          data-hook="popover-content"
          modifiers={modifiers}
          placement={placement}
          className={classNames(style.popover, style.contentWrap, {[style.popoverContent]: !showArrow})}>
          {showArrow &&
          <Arrow data-hook="popover-arrow"
                 className={style.arrow}
                 style={getArrowShift(moveArrowTo, placement)}
          />}
          {showArrow && <div className={style.popoverContent}>
            {childrenObject.Content}
          </div>}
          {!showArrow && childrenObject.Content}
        </Popper>
      </Animation>
    </Manager>
  );
};

Popover.displayName = 'Popover';
Popover.Element = createComponentThatRendersItsChildren('Popover.Element');
Popover.Content = createComponentThatRendersItsChildren('Popover.Content');
