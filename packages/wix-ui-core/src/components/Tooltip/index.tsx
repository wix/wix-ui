import * as React from 'react';
import style from './TooltipStyle.st.css';
import {Popover, Placement, PlacementPropType} from '../../baseComponents/Popover';
import {func, boolean, number, node, object} from 'prop-types';
import {createComponentThatRendersItsChildren, ElementProps} from '../../utils';

const noop = () => { return; };

export type Point = {
  x: number;
  y: number;
};

export interface TooltipProps {
  /** The location to display the content */
  placement?: Placement;
  children?: node;
  content?: node;
  showDelay?: number;
  hideDelay?: number;
  moveBy?: Point;
  moveArrowTo?: number;
  onShow?: Function;
  onHide?: Function;
  appendToParent?: boolean;
  appendTo?: node;
}

export interface TooltipState {
  isOpen: boolean;
}

/**
 * Tooltip
 */

export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  static Element: React.SFC<ElementProps> = createComponentThatRendersItsChildren('Tooltip.Element');
  static Content: React.SFC<ElementProps> = createComponentThatRendersItsChildren('Tooltip.Content');

  static displayName = 'Tooltip';
  static defaultProps = {
    placement: 'top',
    onShow: noop,
    onHide: noop,
    showDelay: 150,
    hideDelay: 150
  };

  static propTypes = {
    /** tooltip's placement in relation to the target element */
    placement: PlacementPropType,
    /** children to render that will be the target of the tooltip */
    children: node,
    /** the content to put inside the tooltip */
    content: node,
    /** time it takes to show the tooltip in ms */
    showDelay: number,
    /** time it takes to hide the tooltip in ms */
    hideDelay: number,
    /** object that describes re-positioning of the tooltip */
    moveBy: object,
    /** offset for the arrow */
    moveArrowTo: number,
    /** callback to call when the tooltip is shown */
    onShow: func,
    /** callback to call when the tooltip is being hidden */
    onHide: func,
    /** Enables calculations in relation to a dom element */
    appendTo: node,
    /** Enables calculations in relation to the parent element*/
    appendToParent: boolean
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
      this.props.onShow();
      this.setState({isOpen: true});
    }
  }

  close() {
    if (this.state.isOpen) {
      this.props.onHide();
      this.setState({isOpen: false});
    }
  }

  render () {
    const {placement, content, children, showDelay, moveBy,
           moveArrowTo, hideDelay, appendTo, appendToParent} = this.props;
    const {isOpen} = this.state;

    return (
      <Popover
        {...style('root', {}, this.props)}
        placement={placement}
        shown={isOpen}
        showArrow={true}
        onMouseEnter={this.open}
        onMouseLeave={this.close}
        showDelay={showDelay}
        hideDelay={hideDelay}
        moveBy={moveBy}
        moveArrowTo={moveArrowTo}
        appendTo={appendTo}
        appendToParent={appendToParent}
      >
        <Popover.Element>
          {children}
        </Popover.Element>
        <Popover.Content>
          {content}
        </Popover.Content>
      </Popover>
    );
  }
}
