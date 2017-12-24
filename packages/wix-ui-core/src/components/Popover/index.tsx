import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {bool, string} from 'prop-types';
import PopperJS from 'popper.js';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';

export type Placement = PopperJS.Placement;

interface PopoverProps {
  shown?: boolean;
  placement: Placement;
}

type PopoverType = React.SFC<PopoverProps> & {
  Element?: React.SFC;
  Content?: React.SFC;
};

const Popover: PopoverType = props => {
    const {placement, shown, children} = props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});

    return (
      <Manager>
        <Target
          data-hook="popover-element"
          style={{display: 'inline-block'}}>
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
  /** Is the popover content shown */
  shown: bool,
  /** The location to display the content */
  placement: string
};

Popover.Element = createComponentThatRendersItsChildren('Popover.Element');
Popover.Content = createComponentThatRendersItsChildren('Popover.Content');

export default Popover;
