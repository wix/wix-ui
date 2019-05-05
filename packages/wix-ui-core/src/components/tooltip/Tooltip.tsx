import * as React from 'react';
import style from './Tooltip.st.css';
import { Popover, Placement, AppendTo } from '../popover';

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
  /** disabled tooltip showup on mouse enter */
  disabled?: boolean;
  /** Enables calculations in relation to the parent element*/
  appendTo?: AppendTo;
  /** whether to enable the flip behaviour. This behaviour is used to flip the Tooltips placement when it starts to overlap the target element. */
  flip?: boolean;
  /** whether to enable the fixed behaviour. This behaviour is used to keep the Tooltip at it's original placement even when it's being positioned outside the boundary. */
  fixed?: boolean;
  /** Provides callback to invoke when outside of tooltip is clicked */
  onClickOutside?: Function;
  /** If true, makes tooltip close when clicked outside (incase it was open) */
  shouldCloseOnClickOutside?: boolean;
  /** time in milliseconds to wait before hiding the tooltip. */
  hideDelay?: number;
  /** time in milliseconds to wait before showing the tooltip. */
  showDelay?: number;
  /** Animation timer */
  timeout?: number;
  /** If true, shows the tooltip arrow */
  showArrow?: boolean;
  /** Custom arrow element */
  customArrow?(placement: string): React.ReactNode;
}

export interface TooltipState {
  isOpen: boolean;
}

/**
 * Tooltip
 */
export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  static displayName = 'Tooltip';

  static defaultProps: Partial<TooltipProps> = {
    placement: 'top',
    appendTo: 'parent',
    onShow: () => ({}),
    onHide: () => ({}),
    timeout: 150,
    showDelay: 0,
    hideDelay: 0,
    showArrow: true,
  };

  state = { isOpen: false };

  _handleClickOutside = () => {
    const { onClickOutside, shouldCloseOnClickOutside } = this.props;
    if (shouldCloseOnClickOutside) {
      this.props.onHide();
      this.setState({ isOpen: false });
    }
    return onClickOutside ? onClickOutside() : null;
  };

  _renderElement = () => {
    const { children } = this.props;
    if (typeof children === 'string' || !children) {
      return children || '';
    }
    return React.cloneElement(children as any, {
      onFocus: this._onFocus,
      onBlur: this._onBlur,
    });
  };

  open = () => {
    this.props.onShow();
    this.setState({ isOpen: true });
  };

  close = () => {
    const { shouldCloseOnClickOutside } = this.props;
    if (!shouldCloseOnClickOutside) {
      this.props.onHide();
      this.setState({ isOpen: false });
    }
  };

  _onFocus = (event, handlers) => {
    const focusableHOC = handlers && handlers.focus;
    this.open();
    return focusableHOC ? handlers.focus() : null;
  };

  _onBlur = (event, handlers) => {
    const focusableHOC = handlers && handlers.blur;
    this.close();
    return focusableHOC ? handlers.blur() : null;
  };

  render() {
    const {
      placement,
      content,
      moveBy,
      timeout,
      showArrow,
      moveArrowTo,
      appendTo,
      flip,
      fixed,
      hideDelay,
      showDelay,
      disabled,
      customArrow,
    } = this.props;

    return (
      <Popover
        {...style('root', {}, this.props)}
        {...(this.props['data-hook']
          ? { 'data-hook': this.props['data-hook'] }
          : {})}
        placement={placement}
        shown={disabled ? false : this.state.isOpen}
        showArrow={showArrow}
        onMouseEnter={this.open}
        onMouseLeave={this.close}
        timeout={timeout}
        hideDelay={hideDelay}
        showDelay={showDelay}
        moveBy={moveBy}
        moveArrowTo={moveArrowTo}
        appendTo={appendTo}
        flip={flip}
        fixed={fixed}
        onClickOutside={this._handleClickOutside}
        customArrow={customArrow}
      >
        <Popover.Element>{this._renderElement()}</Popover.Element>
        <Popover.Content>{content}</Popover.Content>
      </Popover>
    );
  }
}
