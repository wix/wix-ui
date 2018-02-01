import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import PopperJS from 'popper.js';
import style from './Popover.st.css';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import Transition from 'react-transition-group/Transition';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import {oneOf} from 'prop-types';

export type Placement = PopperJS.Placement;
export const PlacementPropType = oneOf(['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']);

export interface PopoverProps {
  /** The location to display the content */
  placement: Placement;
  /** Is the content shown or not */
  shown: boolean;
  /** onMouseEnter on the component */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** onMouseLeave on the component */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
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

  appendTo?: any;
  appendToParent?: boolean;
}

export type PopoverType = React.SFC<PopoverProps> & {
  Element?: React.SFC;
  Content?: React.SFC;
};

const duration = 150;

const defaultStyle = {
  opacity: 0,
  transition: `opacity ${duration}ms ease-in-out`
};

const transitionStylesFactory = (showDelay = duration, hideDelay = duration) => ({
  entering: {opacity: 0, transitionDuration: `${showDelay}ms`},
  entered: {opacity: 1, transitionDuration: `${showDelay}ms`},
  exiting: {transitionDuration: `${hideDelay}ms`},
  exited: {transitionDuration: `${hideDelay}ms`}
});

const Fade = ({inProp, children, transitionStyles}) => (
  <Transition in={inProp} timeout={duration} unmountOnExit={true}>
    {state => (
      <div key="fade-container"
        style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        {[children]}
      </div>
    )}
  </Transition>
);

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
  const {placement, shown, onMouseEnter, onMouseLeave, showArrow,
         children, moveBy, showDelay, hideDelay, moveArrowTo,
         appendToParent, appendTo}  = props;
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
    modifiers['flip'] = {
      boundariesElement: target,
      behavior: ['left', 'bottom', 'top']
    };
  }

  const transitionStyles = transitionStylesFactory(showDelay, hideDelay);

  return (
    <Manager
      {...style('root', {}, props)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <Target data-hook="popover-element">
        {childrenObject.Element}
      </Target>
      <Fade inProp={shown} transitionStyles={transitionStyles}>
        <Popper
          data-hook="popover-content"
          modifiers={modifiers}
          placement={placement}
          className={classNames(style.popoverContentContainer, {[style.popoverContent]: !showArrow})}>
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
      </Fade>
    </Manager>
  );
};

Popover.displayName = 'Popover';
Popover.Element = createComponentThatRendersItsChildren('Popover.Element');
Popover.Content = createComponentThatRendersItsChildren('Popover.Content');
