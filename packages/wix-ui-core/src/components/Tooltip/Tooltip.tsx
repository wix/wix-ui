import * as React from 'react';
import {string, object} from 'prop-types';
import Popover from '../../baseComponents/Popover';
import {Placement} from '../../baseComponents/Popover/Popover';
import {buildChildrenObject, createComponentThatRendersItsChildren, ElementProps} from '../../utils';
import {createHOC} from '../../createHOC';

export interface TooltipProps {
  placement?: Placement;
  classes?: TooltipClasses;
}

export interface TooltipState {
  isOpen: boolean;
}

export type TooltipClasses = {
  tooltip: string;
  arrow: string;
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

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      isOpen: false
    };
  }

  open() {
    if (!this.state.isOpen) {
      this.setState({isOpen: true});
    }
  }

  close() {
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
        onMouseEnter={this.open}
        onMouseLeave={this.close}
        arrowStyle={classes[`${placement}ArrowStyle`]}>>
        <Popover.Element>
          {childrenObject.Element}
        </Popover.Element>
        <Popover.Content>
          <div data-hook="tooltip-content" className={classes.tooltip}>
            {childrenObject.Content}
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(Tooltip);
