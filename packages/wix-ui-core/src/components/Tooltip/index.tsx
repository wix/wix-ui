import * as React from 'react';
import style from './Tooltip.st.css';
import {Popover, Placement, PlacementPropType} from '../../baseComponents/Popover';
import {func, bool, number, node, object} from 'prop-types';
import {createComponentThatRendersItsChildren, ElementProps} from '../../utils';

const noop = () => null;

export type Point = {
  x: number;
  y: number;
};

export interface TooltipProps {
  /** tooltip's placement in relation to the target element */
  placement?: Placement;
  /** children to render that will be the target of the tooltip */
  children?: React.ReactNode;
  /** the content to put inside the tooltip */
  content?: React.ReactNode;
  /** time it takes to show the tooltip in ms */
  showDelay?: number;
  /** time it takes to hide the tooltip in ms */
  hideDelay?: number;
  /** object that describes re-positioning of the tooltip */
  moveBy?: Point;
  /** offset for the arrow */
  moveArrowTo?: number;
  /** callback to call when the tooltip is shown */
  onShow?: Function;
  /** callback to call when the tooltip is being hidden */
  onHide?: Function;
  /** Enables calculations in relation to a dom element */
  appendToParent?: boolean;
  /** Enables calculations in relation to the parent element*/
  appendTo?: React.ReactNode;
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
    appendToParent: bool
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
