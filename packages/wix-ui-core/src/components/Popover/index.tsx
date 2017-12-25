import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {bool, string, func} from 'prop-types';
import PopperJS from 'popper.js';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';

export type Placement = PopperJS.Placement;

interface PopoverProps {
  placement: Placement;
  shown?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

type PopoverType = React.SFC<PopoverProps> & {
  Element?: React.SFC;
  Content?: React.SFC;
};

const Popover: PopoverType = props => {
    const {placement, shown, onMouseEnter, onMouseLeave, children} = props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});

    return (
      <Manager onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Target data-hook="popover-element" style={{display: 'inline-block'}}>
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
  onMouseLeave: func
};

Popover.Element = createComponentThatRendersItsChildren('Popover.Element');
Popover.Content = createComponentThatRendersItsChildren('Popover.Content');

export default Popover;
