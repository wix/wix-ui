import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import PopperJS from 'popper.js';
import {buildChildrenObject, generateDefaultComponent} from '../../utils';

export type Placement = PopperJS.Placement;

interface PopoverProps {
  popoverShown?: boolean;
  placement: Placement;
}

class Popover extends React.Component<PopoverProps> {
  static defaultProps: Partial<PopoverProps> = {
    popoverShown: false
  };

  static Element = generateDefaultComponent('Popover.Element');
  static Content = generateDefaultComponent('Popover.Content');

  render() {
    const {placement, popoverShown, children} = this.props;
    const childrenObject = {Element: null, Content: null};
    buildChildrenObject(children, childrenObject);

    return (
      <Manager>
        <Target
          data-hook="element"
          style={{display: 'inline-block'}}>
          {childrenObject.Element}
        </Target>
          <Popper data-hook="content" placement={placement} style={popoverShown ? null : {display: 'none'}}>
            <Arrow/>
            {childrenObject.Content}
          </Popper>
      </Manager>
    );
  }
}

export default Popover;
