import * as React from 'react';
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
  /** onClick on the component */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** onMouseEnter on the component */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** onMouseLeave on the component */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /** Show show arrow from the content */
  showArrow?: boolean;
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

const transitionStyles = {
  entering: {opacity: 0},
  entered: {opacity: 1},
};

const Fade = ({inProp, children}) => (
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

/**
 * Popover
 */
export const Popover: PopoverType = props => {
  const {placement, shown, onMouseEnter, onMouseLeave, onClick, showArrow, children} = props;
  const childrenObject = buildChildrenObject(children, {Element: null, Content: null});

  return (
    <Manager
      {...style('root', {}, props)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <Target data-hook="popover-element">
        {childrenObject.Element}
      </Target>
      <Fade inProp={shown}>
        <Popper
          data-hook="popover-content"
          placement={placement}
          className={classNames(style.popoverContentContainer, {[style.popoverContent]: !showArrow})}>
          {showArrow && <Arrow data-hook="popover-arrow" className={style.arrow}/>}
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
