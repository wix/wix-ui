import * as React from 'react';
import {string, object} from 'prop-types';
import Popover, {SharedPopoverProps} from '../Popover';
import {buildChildrenObject, createComponentThatRendersItsChildren, ElementProps} from '../../utils';
import {createHOC} from '../../createHOC';

export interface TooltipProps extends SharedPopoverProps {
  classes?: TooltipClasses;
}

export interface TooltipState {
  isOpen: boolean;
}

export type TooltipClasses = {
  tooltip: string;
};

export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  static Element: React.SFC<ElementProps> = createComponentThatRendersItsChildren('Tooltip.Element');
  static Content: React.SFC<ElementProps> = createComponentThatRendersItsChildren('Tooltip.Content');

  static defaultProps = {
    placement: 'top'
  };

  static propTypes = {
    /** The location to display the content */
    placement: string,
    /** Classes object */
    classes: object.isRequired
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
    const {placement, children, classes} = this.props;
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
          <div className={classes.tooltip}>
            {childrenObject.Content}
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(Tooltip);
