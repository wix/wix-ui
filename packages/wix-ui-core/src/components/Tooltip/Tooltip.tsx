import * as React from 'react';
import Popover from '../Popover';
import PopperJS from 'popper.js';
import {createHOC} from '../../createHOC';
import {getChildrenObject, generateDefaultChildComponent} from '../../utils';

interface TooltipProps {
  placement: PopperJS.Placement;
}

class Tooltip extends React.Component<TooltipProps> {

  public static Element = generateDefaultChildComponent('Tooltip.Element');
  public static Content = generateDefaultChildComponent('Tooltip.Content');

  render() {
    const {placement, children} = this.props;
    const childrenObject = getChildrenObject(children, {Element: null, Content: null});

    return (
      <Popover trigger="hover" placement={placement}>
        <Popover.Element>
          {childrenObject.Element}
        </Popover.Element>
        <Popover.Content>
          {childrenObject.Content}
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(Tooltip);
