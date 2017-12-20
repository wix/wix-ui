import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import PopperJS from 'popper.js';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';

export type Placement = PopperJS.Placement;

interface PopoverProps {
  popoverShown?: boolean;
  placement: Placement;
}

class Popover extends React.Component<PopoverProps> {
  static defaultProps: Partial<PopoverProps> = {
    popoverShown: false
  };

  static Element = createComponentThatRendersItsChildren('Popover.Element');
  static Content = createComponentThatRendersItsChildren('Popover.Content');

  render() {
    const {placement, popoverShown, children} = this.props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});

    return (
      <Manager>
        <Target
          data-hook="element"
          style={{display: 'inline-block'}}>
          {childrenObject.Element}
        </Target>
        {
          popoverShown &&
            <Popper data-hook="content" placement={placement}>
              <Arrow/>
              {childrenObject.Content}
            </Popper>
        }
      </Manager>
    );
  }
}

export default Popover;
