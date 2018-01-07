import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {bool, string, func} from 'prop-types';
import PopperJS from 'popper.js';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import {createHOC} from '../../createHOC';

export type PopoverClasses = {
  popoverContent: string;
  arrow: string;
};

export interface PopoverProps {
  shown?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  classes?: PopoverClasses;
  arrowStyle?: string;
}

export interface SharedPopoverProps {
  placement?: PopperJS.Placement;
}

export type PopoverType = React.SFC<PopoverProps & SharedPopoverProps> & {
  Element?: React.SFC;
  Content?: React.SFC;
};

const Popover: PopoverType = ({placement, shown, onMouseEnter, onMouseLeave, children, arrowStyle, classes}) => {
  const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
  return (
    <Manager
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{display: 'inline-block'}}>
      <Target data-hook="popover-element">
        {childrenObject.Element}
      </Target>
      {
        shown &&
        <Popper data-hook="popover-content" placement={placement}
                className={classes.popoverContent}>
          <Arrow className={`${classes.arrow} ${arrowStyle}`}/>
          {childrenObject.Content}
        </Popper>
      }
    </Manager>
  );
};

Popover.defaultProps = {
  placement: 'auto'
};

Popover.propTypes = {
  /** The location to display the content */
  placement: string,
  /** Is the popover content shown */
  shown: bool,
  /** Event handler for onMouseEnter event */
  onMouseEnter: func,
  /** Event handler for onMouseLeave event */
  onMouseLeave: func
};

Popover.Element = createComponentThatRendersItsChildren('Popover.Element');
Popover.Content = createComponentThatRendersItsChildren('Popover.Content');

const popoverExport = createHOC(Popover);
export {popoverExport as Popover};
