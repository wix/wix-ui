import * as React from 'react';
import PopperJS from 'popper.js';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import style from './Popover.st.css';
import * as classNames from 'classnames';

export type Placement = PopperJS.Placement;

export interface PopoverProps {
  placement: Placement;
  shown: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  showArrow?: boolean;
}

export type PopoverType = React.SFC<PopoverProps> & {
  Element?: React.SFC;
  Content?: React.SFC;
};

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

Popover.defaultProps = {
  placement: 'auto'
};

Popover.Element = createComponentThatRendersItsChildren('Popover.Element');
Popover.Content = createComponentThatRendersItsChildren('Popover.Content');
