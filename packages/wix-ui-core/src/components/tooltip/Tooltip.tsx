import * as React from 'react';
import { st, classes } from './Tooltip.st.css';
import { Popover, Placement, AppendTo } from '../popover';
import { filterDataProps } from '../../utils/filter-data-props';

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
  /** hide tooltip when mouse leaves tooltip element */
  hideOnMouseLeave?: boolean;
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
  timeout?: number | { enter: number; exit: number };
  /** If true, shows the tooltip arrow */
  showArrow?: boolean;
  /** Custom arrow element */
  customArrow?(placement: Placement, arrowProps: object): React.ReactNode;
  /** unique identifier to map target element and content element for screen readers */
  'aria-describedby'?: string;
  /** Tooltip's content zindex */
  zIndex?: number;
  /** content element minWidth value */
  minWidth?: number;
  /** content element maxWidth value */
  maxWidth?: number;

  className?: string;
  /** hook for testing purposes */
  'data-hook'?: string;
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
    hideOnMouseLeave: true,
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
    const {
      children,
      'aria-describedby': ariaDescribedBy,
      hideOnMouseLeave,
    } = this.props;
    if (typeof children === 'string' || !children) {
      return children || '';
    }
    const hideOnMouseLeaveProps = hideOnMouseLeave
      ? {
          onMouseOver: () => this.handleElementHover(true),
          onMouseLeave: () => this.handleElementHover(false),
        }
      : {};
    return React.cloneElement(children as any, {
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      ...hideOnMouseLeaveProps,
      'aria-describedby': ariaDescribedBy,
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

  handleElementHover = hovered => {
    if (this.state.isOpen !== hovered) {
      if (hovered) {
        this.open();
      } else {
        this.close();
      }
    }
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
      zIndex,
      minWidth,
      maxWidth,
      'aria-describedby': ariaDescribedBy,
      className,
      hideOnMouseLeave,
      children,
    } = this.props;

    const shouldHideOnLeave =
      hideOnMouseLeave && children && typeof children !== 'string';

    return (
      <Popover
        className={st(classes.root, className)}
        placement={placement}
        shown={disabled ? false : this.state.isOpen}
        showArrow={showArrow}
        onMouseEnter={disabled || shouldHideOnLeave ? undefined : this.open}
        onMouseLeave={disabled || shouldHideOnLeave ? undefined : this.close}
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
        id={ariaDescribedBy}
        role="tooltip"
        zIndex={zIndex}
        minWidth={minWidth}
        maxWidth={maxWidth}
        {...filterDataProps(this.props)}
      >
        <Popover.Element>{this._renderElement()}</Popover.Element>
        <Popover.Content>{content}</Popover.Content>
      </Popover>
    );
  }
}
