import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {bool, string} from 'prop-types';
import PopperJS from 'popper.js';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';

export type Placement = PopperJS.Placement;

interface PopoverProps {
  popoverShown?: boolean;
  placement: Placement;
}

type PopoverType = React.SFC<PopoverProps> & {
  Element?: React.SFC;
  Content?: React.SFC;
};

const Popover: PopoverType = props => {
    const {placement, popoverShown, children} = props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});

    return (
      <Manager>
        <Target
          data-hook="popover-element"
          style={{display: 'inline-block'}}>
          {childrenObject.Element}
        </Target>
        {
          popoverShown &&
            <Popper data-hook="popover-content" placement={placement}>
              <Arrow/>
              {childrenObject.Content}
            </Popper>
        }
      </Manager>
  );
};

Popover.defaultProps = {
  popoverShown: false
};

Popover.propTypes = {
  popoverShown: bool,
  placement: string
};

Popover.Element = createComponentThatRendersItsChildren('Popover.Element');
Popover.Content = createComponentThatRendersItsChildren('Popover.Content');

export default Popover;
