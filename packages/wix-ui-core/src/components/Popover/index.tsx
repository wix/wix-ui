import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {bool, string, func, number} from 'prop-types';
import PopperJS from 'popper.js';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';

export type Placement = PopperJS.Placement;

export interface PopoverProps {
  shown?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export interface SharedPopoverProps {
  placement: Placement;
  tabIndex?: number;
}

export type PopoverType = React.SFC<PopoverProps & SharedPopoverProps> & {
  Element?: React.SFC;
  Content?: React.SFC;
};

const Popover: PopoverType = props => {
    const {placement, shown, onMouseEnter, onMouseLeave, children, tabIndex} = props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});

    return (
      <Manager
        tabIndex={tabIndex}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{display: 'inline-block'}}>
        <Target data-hook="popover-element">
          {childrenObject.Element}
        </Target>
        {
          shown &&
            <Popper data-hook="popover-content" placement={placement}>
              <Arrow/>
              {childrenObject.Content}
            </Popper>
        }
      </Manager>
  );
};

Popover.propTypes = {
  /** The location to display the content */
  placement: string.isRequired,
  /** Is the popover content shown */
  shown: bool,
  /** Event handler for onMouseEnter event */
  onMouseEnter: func,
  /** Event handler for onMouseLeave event */
  onMouseLeave: func,
  /** Tab index of the element */
  tabIndex: number
};

Popover.Element = createComponentThatRendersItsChildren('Popover.Element');
Popover.Content = createComponentThatRendersItsChildren('Popover.Content');

export default Popover;
