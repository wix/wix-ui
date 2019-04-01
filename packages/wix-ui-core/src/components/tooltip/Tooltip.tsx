import * as React from 'react';
import style from './Tooltip.st.css';
import onClickOutside, {
  InjectedOnClickOutProps,
  OnClickOutProps,
} from 'react-onclickoutside';
import { Popover, Placement, AppendTo } from '../popover';
import {
  createComponentThatRendersItsChildren,
  ElementProps,
} from '../../utils';

const noop = () => null;

export interface Point {
  x: number;
  y: number;
}

export interface TooltipProps {
  /** tooltip's placement in relation to the target element */
  placement?: Placement;
  /** children to render that will be the target of the tooltip */
  children?: React.ReactNode;
  /** the content to put inside the tooltip */
  content?: React.ReactNode;
  /** object that describes re-positioning of the tooltip */
  moveBy?: Point;
  /** offset for the arrow */
  moveArrowTo?: number;
  /** callback to call when the tooltip is shown */
  onShow?: Function;
  /** callback to call when the tooltip is being hidden */
  onHide?: Function;
  /** Enables calculations in relation to the parent element*/
  appendTo?: AppendTo;
  /** Provides callback to invoke when outside of tooltip is clicked */
  onClickOutside?: Function;
  /** If true, makes tooltip close when clicked outside (incase it was open) */
  shouldCloseOnClickOutside?: boolean;
  /** Animation timer */
  timeout?: number;
  /** If true, shows the tooltip arrow */
  showArrow?: boolean;
}

export interface TooltipState {
  isOpen: boolean;
}

/**
 * Tooltip
 */
export class TooltipComponent extends React.PureComponent<
  TooltipProps & InjectedOnClickOutProps,
  TooltipState
> {
  static Element: React.SFC<
    ElementProps
  > = createComponentThatRendersItsChildren('Tooltip.Element');
  static Content: React.SFC<
    ElementProps
  > = createComponentThatRendersItsChildren('Tooltip.Content');

  static displayName = 'Tooltip';
  static defaultProps: Partial<TooltipProps & InjectedOnClickOutProps> = {
    placement: 'top',
    appendTo: 'parent',
    onShow: noop,
    onHide: noop,
    timeout: 150,
    showArrow: true,
  };

  state = { isOpen: false };

  handleClickOutside() {
    if (this.props.onClickOutside) {
      this.props.onClickOutside();
    }
    if (this.props.shouldCloseOnClickOutside) {
      this.close();
    }
  }

  renderElement = () =>
    React.cloneElement(this.props.children, {
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    });

  open = () => {
    if (!this.state.isOpen) {
      this.props.onShow();
      this.setState({ isOpen: true });
    }
  };

  close = () => {
    if (this.state.isOpen && !this.props.shouldCloseOnClickOutside) {
      this.props.onHide();
      this.setState({ isOpen: false });
    }
  };

  onFocus = (event, triggers) => {
    this.open();
    return triggers ? triggers.focus() : null;
  };

  onBlur = (event, triggers) => {
    this.close();
    return triggers ? triggers.blur() : null;
  };

  render() {
    const {
      placement,
      content,
      children,
      moveBy,
      timeout,
      showArrow,
      moveArrowTo,
      appendTo,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <Popover
        {...style('root', {}, this.props)}
        placement={placement}
        shown={isOpen}
        showArrow={showArrow}
        onMouseEnter={this.open}
        onMouseLeave={this.close}
        timeout={timeout}
        moveBy={moveBy}
        moveArrowTo={moveArrowTo}
        appendTo={appendTo}
      >
        <Popover.Element>{this.renderElement()}</Popover.Element>
        <Popover.Content>{content}</Popover.Content>
      </Popover>
    );
  }
}

export const Tooltip: React.ComponentClass<
  OnClickOutProps<TooltipProps & InjectedOnClickOutProps>
> = onClickOutside(TooltipComponent);
