import * as React from 'react';
import PopperJS from 'popper.js';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import style from './Popover.st.css';

export type Placement = PopperJS.Placement;

export interface PopoverProps {
  placement: Placement;
  shown: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  arrowStyle?: string;
  showArrow?: boolean;
}

export type PopoverType = React.SFC<PopoverProps> & {
  Element?: React.SFC;
  Content?: React.SFC;
};

export const Popover: PopoverType = (props) => {
  const {placement, shown, onMouseEnter, onMouseLeave, children, arrowStyle, showArrow} = props;
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
          <Popper data-hook="popover-content" placement={placement} className={style.popoverContent}>
            {showArrow && <Arrow data-hook="popover-arrow" className={`${style.arrow} ${arrowStyle}`}/>}
            {childrenObject.Content}
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
