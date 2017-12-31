import * as React from 'react';
import {string} from 'prop-types';
import Popover, {SharedPopoverProps} from '../Popover';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import {createHOC} from '../../createHOC';

interface TooltipProps extends SharedPopoverProps {
}

interface TooltipState {
  isHover: boolean;
}

class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {

  static Element = createComponentThatRendersItsChildren('Tooltip.Element');
  static Content = createComponentThatRendersItsChildren('Tooltip.Content');

  static defaultProps = {
    placement: 'top'
  };

  static propTypes = {
    /** The location to display the content */
    placement: string
  };

  constructor(props) {
    super(props);

    this.state = {
      isHover: false
    };
  }

  _setHover(isHover) {
    this.setState({isHover});
  }

  render () {
    const {placement, children} = this.props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const {isHover} = this.state;

    return (
      <Popover placement={placement} shown={isHover}>
        <Popover.Element>
          <div
            data-hook="tooltip-element"
            onMouseEnter={() => this._setHover(true)}
            onMouseLeave={() => this._setHover(false)}>
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
