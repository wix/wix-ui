import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import PopperJS from 'popper.js';

export type Placement = PopperJS.Placement;

interface PopoverProps {
  popoverShown?: boolean;
  placement: Placement;
  Element: any;
  Content: any;
}

const Popover: React.SFC<PopoverProps> = props => (
    <Manager>
      <Target
        data-hook="popover-element"
        style={{display: 'inline-block'}}>
        {props.Element}
      </Target>
      {
        props.popoverShown &&
          <Popper data-hook="popover-content" placement={props.placement}>
            <Arrow/>
            {props.Content}
          </Popper>
      }
    </Manager>
);

Popover.defaultProps = {
  popoverShown: false
};

export default Popover;
