import * as React from 'react';
import PopperJS from 'popper.js';
import { ClickOutside } from '../click-outside';
import { Manager, Reference, Popper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import { Portal } from 'react-portal';
import { st, classes } from './Popover.st.css';
import { createModifiers } from './modifiers';
import { filterDataProps } from '../../utils/filter-data-props';
const uniqueId = require('lodash/uniqueId');

import {
  buildChildrenObject,
  createComponentThatRendersItsChildren,
  ElementProps,
} from '../../utils';
import { PopoverContext } from './PopoverContext';
import { popoverTestUtils } from './helpers';
import { getAppendToElement, Predicate } from './utils/getAppendToElement';
import classNames from 'classnames';
import { MoveBy } from './utils/getModifiers';

// This is here and not in the test setup because we don't want consumers to need to run it as well
let testId;
const isTestEnv = process.env.NODE_ENV === 'test';

if (isTestEnv && typeof document !== 'undefined' && !document.createRange) {
  popoverTestUtils.createRange();
}

export type Placement = PopperJS.Placement;
export type AppendTo = PopperJS.Boundary | 'parent' | Element | Predicate;

export interface PopoverProps {
  /** hook for testing purposes */
  'data-hook'?: string;
  /** custom classname */
  className?: string;
  /** The location to display the content */
  placement: Placement;
  /** Is the content shown or not */
  shown: boolean;
  /** onClick on the component */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Provides callback to invoke when clicked outside of the popover */
  onClickOutside?: Function;
  /**
   * Clicking on elements with this excluded class will will not trigger onClickOutside callback
   */
  excludeClass?: string;
  /** onMouseEnter on the component */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** onMouseLeave on the component */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /** onKeyDown on the target component */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Show show arrow from the content */
  showArrow?: boolean;
  /**
   * Whether to enable the flip behaviour. This behaviour is used to flip the `<Popover/>`'s placement
   * when it starts to overlap the target element (`<Popover.Element/>`).
   */
  flip?: boolean;
  /**
   * Whether to enable the fixed behaviour. This behaviour is used to keep the `<Popover/>` at it's
   * original placement even when it's being positioned outside the boundary.
   */
  fixed?: boolean;
  /** Moves popover relative to the parent */
  moveBy?: MoveBy;
  /** Hide Delay in ms */
  hideDelay?: number;
  /** Show Delay in ms */
  showDelay?: number;
  /** Moves arrow by amount */
  moveArrowTo?: number;
  /** Enables calculations in relation to a dom element */
  appendTo?: AppendTo;
  /** Animation timer */
  timeout?: number | { enter: number; exit: number };
  /** Inline style */
  style?: object;
  /** Id */
  id?: string;
  /* stretch trigger element to the width of its container. */
  fluid?: boolean;

  /** Custom arrow element */
  customArrow?(placement: Placement, arrowProps: object): React.ReactNode;

  /** target element role value */
  role?: string;
  /** popover z-index */
  zIndex?: number;
  /**
   * popovers content is set to minnimum width of trigger element,
   * but it can expand up to the value of maxWidth.
   */
  dynamicWidth?: boolean;
  /**
   * popover content minWidth value
   * - `number` value which converts to css with `px`
   * - `string` value that contains `px`
   */
  minWidth?: number | string;
  /**
   * popover content maxWidth value
   * - `number` value which converts to css with `px`
   * - `string` value that contains `px`
   */
  maxWidth?: number | string;
  /**
   * popover content width value
   * - `number` value which converts to css with `px`
   * - `string` value that contains `px`
   */
  width?: number | string;
  /**
   * Breaking change:
   * When true - onClickOutside will be called only when popover content is shown
   */
  disableClickOutsideWhenClosed?: boolean;

  dataHook?: string;
  /**
   * the classname to be passed to the popover's content container
   */
  contentClassName?: string;
}

export interface PopoverState {
  isMounted: boolean;
  shown: boolean;
}

export type PopoverType = PopoverProps & {
  Element?: React.FunctionComponent<ElementProps>;
  Content?: React.FunctionComponent<ElementProps>;
};

const attachClasses = (node: HTMLElement, classnames: string) =>
  node && node.classList.add(...classnames.split(' '));
const detachClasses = (node: HTMLElement, classnames: string) =>
  node && node.classList.remove(...classnames.split(' '));

const shouldAnimatePopover = ({ timeout }: PopoverProps) => {
  if (typeof timeout === 'object') {
    const { enter, exit } = timeout;

    return (
      typeof enter !== 'undefined' &&
      typeof exit !== 'undefined' &&
      (enter > 0 || exit > 0)
    );
  }

  return !!timeout;
};

const getArrowShift = (shift: number | undefined, direction: string) => {
  if (!shift && !isTestEnv) {
    return {};
  }

  if (direction.startsWith('top') || direction.startsWith('bottom')) {
    return { left: `${shift}px` };
  }

  if (direction.startsWith('left') || direction.startsWith('right')) {
    return { top: `${shift}px` };
  }

  // Arrow can't be shifted when using automatic positioning
  return {};
};

/**
 * Popover
 */
export class Popover extends React.Component<PopoverProps, PopoverState> {
  static displayName = 'Popover';

  static defaultProps = {
    flip: true,
    fixed: false,
    zIndex: 1000,
  };

  static Element = createComponentThatRendersItsChildren('Popover.Element');
  static Content = createComponentThatRendersItsChildren('Popover.Content');

  targetRef: HTMLElement = null;
  portalNode: HTMLElement = null;
  portalClasses: string;
  appendToNode: HTMLElement = null;
  clickOutsideRef: any = null;
  clickOutsideClass: string;
  contentHook: string;

  popperScheduleUpdate: () => void = null;

  // Timer instances for the show/hide delays
  _hideTimeout: any = null;
  _showTimeout: any = null;

  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      shown: props.shown || false,
    };

    if (isTestEnv) {
      testId = popoverTestUtils.generateId();
    }

    this.clickOutsideRef = React.createRef();
    this.clickOutsideClass = uniqueId('clickOutside');
    this.contentHook = `popover-content-${props['data-hook'] || ''}-${testId}`;
  }

  _handleClickOutside = event => {
    const {
      onClickOutside: onClickOutsideCallback,
      shown,
      disableClickOutsideWhenClosed,
    } = this.props;
    if (onClickOutsideCallback && !(disableClickOutsideWhenClosed && !shown)) {
      onClickOutsideCallback(event);
    }
  };

  getPopperContentStructure(childrenObject) {
    const {
      moveBy,
      appendTo,
      placement,
      showArrow,
      moveArrowTo,
      flip,
      fixed,
      customArrow,
      role,
      id,
      zIndex,
      minWidth,
      maxWidth,
      width,
      dynamicWidth,
      excludeClass = this.clickOutsideClass,
      contentClassName,
    } = this.props;
    const shouldAnimate = shouldAnimatePopover(this.props);

    const modifiers = createModifiers({
      minWidth,
      width,
      dynamicWidth,
      moveBy,
      appendTo,
      shouldAnimate,
      flip,
      placement,
      fixed,
      isTestEnv,
    });

    const popper = (
      <Popper modifiers={modifiers} placement={placement}>
        {({
          ref,
          style: popperStyles,
          placement: popperPlacement,
          arrowProps,
          scheduleUpdate,
        }) => {
          this.popperScheduleUpdate = scheduleUpdate;
          return (
            <PopoverContext.Consumer>
              {({ excludeClickOutsideClasses }) => {
                return (
                  <div
                    ref={ref}
                    data-hook="popover-content"
                    data-content-element={this.contentHook}
                    style={{ ...popperStyles, zIndex, maxWidth }}
                    data-placement={popperPlacement || placement}
                    className={classNames(
                      classes.popover,
                      this.clickOutsideClass,
                      contentClassName,
                      {
                        [classes.withArrow]: showArrow,
                        [classes.popoverContent]: !showArrow,
                      },
                      ...excludeClickOutsideClasses,
                    )}
                  >
                    {showArrow &&
                      this.renderArrow(
                        arrowProps,
                        moveArrowTo,
                        popperPlacement || placement,
                        customArrow,
                      )}
                    <div
                      key="popover-content"
                      id={id}
                      role={role}
                      className={showArrow ? classes.popoverContent : ''}
                    >
                      <PopoverContext.Provider
                        value={{
                          excludeClickOutsideClasses: [
                            excludeClass,
                            ...excludeClickOutsideClasses,
                          ],
                        }}
                      >
                        {childrenObject.Content}
                      </PopoverContext.Provider>
                    </div>
                  </div>
                );
              }}
            </PopoverContext.Consumer>
          );
        }}
      </Popper>
    );

    return this.wrapWithAnimations(popper);
  }

  applyStylesToPortaledNode() {
    const { shown } = this.state;
    const shouldAnimate = shouldAnimatePopover(this.props);

    if (shouldAnimate || shown) {
      attachClasses(this.portalNode, this.portalClasses);
    } else {
      detachClasses(this.portalNode, this.portalClasses);
    }
  }

  wrapWithAnimations(popper) {
    const { timeout } = this.props;
    const { shown } = this.state;

    const shouldAnimate = shouldAnimatePopover(this.props);

    return shouldAnimate ? (
      <CSSTransition
        in={shown}
        timeout={timeout}
        unmountOnExit
        classNames={{
          enter: classes['popoverAnimation-enter'],
          enterActive: classes['popoverAnimation-enter-active'],
          exit: classes['popoverAnimation-exit'],
          exitActive: classes['popoverAnimation-exit-active'],
        }}
        onExited={() => detachClasses(this.portalNode, this.portalClasses)}
      >
        {popper}
      </CSSTransition>
    ) : (
      popper
    );
  }

  renderPopperContent(childrenObject) {
    const popper = this.getPopperContentStructure(childrenObject);

    return this.portalNode ? (
      <Portal node={this.portalNode}>{popper}</Portal>
    ) : (
      popper
    );
  }

  renderArrow(arrowProps, moveArrowTo, placement, customArrow) {
    const commonProps = {
      ref: arrowProps.ref,
      key: 'popover-arrow',
      'data-hook': 'popover-arrow',
      style: {
        ...arrowProps.style,
        ...getArrowShift(moveArrowTo, placement),
      },
    };

    if (customArrow) {
      return customArrow(placement, commonProps);
    }

    return <div {...commonProps} className={classes.arrow} />;
  }

  componentDidMount() {
    this.initAppendToNode();
    this.setState({ isMounted: true });
  }

  initAppendToNode() {
    const { appendTo } = this.props;
    this.appendToNode = getAppendToElement(appendTo, this.targetRef);
    if (this.appendToNode) {
      this.portalNode = document.createElement('div');
      this.portalNode.setAttribute('data-hook', 'popover-portal');
      /**
       * reset overlay wrapping layer
       * so that styles from copied classnames
       * won't break the overlay:
       * - content is position relative to body
       * - overlay layer is hidden
       */
      Object.assign(this.portalNode.style, {
        position: 'static',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      });
      this.appendToNode.appendChild(this.portalNode);
    }
  }

  hidePopover() {
    const { isMounted } = this.state;
    const { hideDelay } = this.props;

    if (!isMounted || this._hideTimeout) {
      return;
    }

    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }

    if (hideDelay) {
      this._hideTimeout = setTimeout(() => {
        this.setState({ shown: false });
      }, hideDelay);
    } else {
      this.setState({ shown: false });
    }
  }

  showPopover() {
    const { isMounted } = this.state;
    const { showDelay } = this.props;

    if (!isMounted || this._showTimeout) {
      return;
    }

    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }

    if (showDelay) {
      this._showTimeout = setTimeout(() => {
        this.setState({ shown: true });
      }, showDelay);
    } else {
      this.setState({ shown: true });
    }
  }

  componentWillUnmount() {
    if (this.portalNode && this.appendToNode.children.length) {
      // FIXME: What if component is updated with a different appendTo? It is a far-fetched use-case,
      // but we would need to remove the portaled node, and created another one.
      this.appendToNode.removeChild(this.portalNode);
    }
    this.portalNode = null;

    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }

    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }
  }

  updatePosition() {
    if (this.popperScheduleUpdate) {
      this.popperScheduleUpdate();
    }
  }

  componentDidUpdate(prevProps) {
    const { shown } = this.props;
    if (this.portalNode) {
      // Re-calculate the portal's styles
      this.portalClasses = st(classes.root, this.props.className);

      // Apply the styles to the portal
      this.applyStylesToPortaledNode();
    }

    // Update popover visibility
    if (prevProps.shown !== shown) {
      if (shown) {
        this.showPopover();
      } else {
        this.hidePopover();
      }
    } else {
      // Update popper's position
      this.updatePosition();
    }
  }

  render() {
    const {
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      onClick,
      children,
      style,
      id,
      excludeClass,
      fluid,
    } = this.props;
    const { isMounted, shown } = this.state;

    const childrenObject = buildChildrenObject(children, {
      Element: null,
      Content: null,
    });

    const shouldAnimate = shouldAnimatePopover(this.props);
    const shouldRenderPopper = isMounted && (shouldAnimate || shown);

    return (
      <Manager>
        <ClickOutside
          rootRef={this.clickOutsideRef}
          onClickOutside={shown ? this._handleClickOutside : undefined}
          excludeClass={[this.clickOutsideClass, excludeClass]}
        >
          <div
            ref={this.clickOutsideRef}
            style={style}
            data-content-hook={this.contentHook}
            className={st(classes.root, { fluid }, this.props.className)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            id={id}
            {...filterDataProps(this.props)}
          >
            <Reference innerRef={r => (this.targetRef = r)}>
              {({ ref }) => (
                <div
                  ref={ref}
                  className={classes.popoverElement}
                  data-hook="popover-element"
                  onClick={onClick}
                  onKeyDown={onKeyDown}
                >
                  {childrenObject.Element}
                </div>
              )}
            </Reference>
            {shouldRenderPopper && this.renderPopperContent(childrenObject)}
          </div>
        </ClickOutside>
      </Manager>
    );
  }
}
