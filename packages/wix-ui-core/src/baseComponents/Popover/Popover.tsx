import * as React from 'react';
import * as classNames from 'classnames';
import PopperJS from 'popper.js';
import style from './Popover.st.css';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {CSSTransition} from 'react-transition-group';
import {buildChildrenObject, createComponentThatRendersItsChildren, ElementProps} from '../../utils';
import {oneOf, oneOfType, element, Requireable} from 'prop-types';

// This is here and not in the test setup because we don't want consumers to need to run it as well
const isTestEnv = process.env.NODE_ENV === 'test';
if (isTestEnv) {
  if (!document.createRange) {
    document.createRange = () => ({
      setStart: () => null,
      setEnd: () => null,
      commonAncestorContainer: document.documentElement.querySelector('body')
    } as any);
  }
}

export type Placement = PopperJS.Placement;
export type AppendTo = PopperJS.Boundary | Element;
export const AppendToPropType = oneOfType([
  oneOf(['scrollParent', 'viewport', 'window']),
  element
]);

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
  appendTo?: AppendTo;
  /** Enables calculations in relation to the parent element*/
  appendToParent?: boolean;
  /** Animation timer */
  timeout?: number;
}

export type PopoverType = React.SFC<PopoverProps> & {
  Element?: React.SFC<ElementProps>;
  Content?: React.SFC<ElementProps>;
};

const getArrowShift = (shift: number | undefined, direction: string) => {
  if (!shift && !isTestEnv) {
    return {};
  }

  return {
    [direction === 'top' || direction === 'bottom' ? 'left' : 'top']: `${shift}px`
  };
};

const createModifiers = ({moveBy, appendToParent, appendTo}) => {
  const modifiers: PopperJS.Modifiers = {
    offset: {
      offset: `${moveBy ? moveBy.x : 0}px, ${moveBy ? moveBy.y : 0}px`
    }
  };

  if (isTestEnv) {
    modifiers.computeStyle = {enabled: false};
  }

  const target = appendToParent ? null : appendTo  || null;
  if (target) {
    modifiers.preventOverflow = {
      boundariesElement: target
    };
  }

  return modifiers;
};

const renderPopper = ({modifiers, placement, showArrow, moveArrowTo, childrenObject}) => (
  <Popper
    data-hook="popover-content"
    modifiers={modifiers}
    placement={placement}
    className={classNames(style.popover, {[style.popoverContent]: !showArrow})}>
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
);

/**
 * Popover
 */
export const Popover: PopoverType = props => {
  const {
    placement,
    shown,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onClick,
    showArrow,
    children,
    moveBy,
    moveArrowTo,
    timeout,
    appendToParent,
    appendTo
  } = props;

  const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
  const modifiers = createModifiers({moveBy, appendToParent, appendTo});

  return (
    <Manager
      {...style('root', {}, props)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <Target onKeyDown={onKeyDown} data-hook="popover-element">
        {childrenObject.Element}
      </Target>
      {
        !!timeout &&
          <CSSTransition in={shown} timeout={Number(timeout)} unmountOnExit={true} classNames={style.popoverAnimation}>
            {renderPopper({modifiers, placement, showArrow, moveArrowTo, childrenObject})}
          </CSSTransition>
      }
      {
        !timeout && shown &&
        renderPopper({modifiers, placement, showArrow, moveArrowTo, childrenObject})
      }
    </Manager>
  );
};

Popover.displayName = 'Popover';
Popover.Element = createComponentThatRendersItsChildren('Popover.Element');
Popover.Content = createComponentThatRendersItsChildren('Popover.Content');
Popover.defaultProps = {
  timeout: 150
};
