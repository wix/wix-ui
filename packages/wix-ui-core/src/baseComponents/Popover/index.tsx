import * as React from 'react';
import * as classNames from 'classnames';
import PopperJS from 'popper.js';
import style from './Popover.st.css';
import {Manager, Target, Popper, Arrow} from 'react-popper';
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
}

export type PopoverType = React.SFC<PopoverProps> & {
  Element?: React.SFC;
  Content?: React.SFC;
};

/**
 * Popover
 */
export const Popover: PopoverType = props => {
  const {placement, shown, onMouseEnter, onMouseLeave, showArrow, children} = props;
  const childrenObject = buildChildrenObject(children, {Element: null, Content: null});

  return (
    <Manager
      {...style('root', {}, props)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <Target data-hook="popover-element">
        {childrenObject.Element}
      </Target>
      {
        shown &&
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
      }
    </Manager>
  );
};

Popover.displayName = 'Popover';
Popover.Element = createComponentThatRendersItsChildren('Popover.Element');
Popover.Content = createComponentThatRendersItsChildren('Popover.Content');
