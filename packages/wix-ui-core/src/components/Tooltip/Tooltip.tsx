import * as React from 'react';
import Popover, {Placement} from '../Popover';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import {createHOC} from '../../createHOC';

interface TooltipProps {
  placement: Placement;
}

interface TooltipState {
  isHover: boolean;
}

class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {

  static Element = createComponentThatRendersItsChildren('Tooltip.Element');
  static Content = createComponentThatRendersItsChildren('Tooltip.Content');

  constructor(props) {
    super(props);

    this.state = {
      isHover: false
    };
  }

  _wrapElement(element) {
    return (
      <div
        data-hook="tooltip-element"
        onMouseEnter={() => this.setState({isHover: true})}
        onMouseLeave={() => this.setState({isHover: false})}>
        {element}
      </div>
    );
  }

  render () {
    const {placement, children} = this.props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const {isHover} = this.state;

    return (
      <Popover placement={placement} popoverShown={isHover}>
        <Popover.Element>
          <div
            data-hook="tooltip-element"
            onMouseEnter={() => this.setState({isHover: true})}
            onMouseLeave={() => this.setState({isHover: false})}>
            {childrenObject.Element}
          </div>
        </Popover.Element>
        <Popover.Content>
          {childrenObject.Content}
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(Tooltip);
