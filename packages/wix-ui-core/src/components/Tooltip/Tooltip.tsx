import * as React from 'react';
import {string} from 'prop-types';
import Popover, {SharedPopoverProps} from '../Popover';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import {createHOC} from '../../createHOC';

interface TooltipProps extends SharedPopoverProps {
}

interface TooltipState {
  isOpen: boolean;
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

    this._open = this._open.bind(this);
    this._close = this._close.bind(this);

    this.state = {
      isOpen: false
    };
  }

  _open() {
    if (!this.state.isOpen) {
      this.setState({isOpen: true});
    }
  }

  _close() {
    if (this.state.isOpen) {
      this.setState({isOpen: false});
    }
  }

  render () {
    const {placement, children} = this.props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const {isOpen} = this.state;

    return (
      <Popover
        placement={placement}
        shown={isOpen}
        onMouseEnter={this._open}
        onMouseLeave={this._close}>
        <Popover.Element>
          <div
            data-hook="tooltip-element">
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
