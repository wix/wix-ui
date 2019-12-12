import * as React from 'react';
import { Placement, Boundary } from 'popper.js';
import { Manager, Reference } from 'react-popper';

import { ClickOutside } from '../click-outside';
import style from './popover-next.st.css';

import {
  AttributeMap,
  attachStylesToNode,
  detachStylesFromNode,
} from '../../utils/stylableUtils';

import {
  buildChildrenObject,
  createComponentThatRendersItsChildren,
  ElementProps,
} from '../../utils';

import { getPopoverTestUtils } from './utils/getPopoverTestUtils';
import { getAppendToElement, Predicate } from './utils/getAppendToElement';
import { shouldAnimatePopover } from './utils/shouldAnimatePopover';

import Popper from './components/Popper';

// This is here and not in the test setup because we don't want consumers to need to run it as well
let testId;
const isTestEnv = process.env.NODE_ENV === 'test';

if (isTestEnv && typeof document !== 'undefined' && !document.createRange) {
  getPopoverTestUtils.createRange();
}

if (isTestEnv) {
  testId = getPopoverTestUtils.generateId();
}

export interface PopoverNextProps {
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
  moveBy?: { x: number; y: number };
  /** Hide Delay in ms */
  hideDelay?: number;
  /** Show Delay in ms */
  showDelay?: number;
  /** Moves arrow by amount */
  moveArrowTo?: number;
  /** Enables calculations in relation to a dom element */
  appendTo?: Boundary | 'parent' | Element | Predicate;
  /** Animation timer */
  timeout?: number | { enter: number; exit: number };
  /** Inline style */
  style?: object;
  /** Id */
  id?: string;
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
}

export interface PopoverNextState {
  isMounted: boolean;
  shown: boolean;
  loaded: boolean;
}

export type PopoverNextType = PopoverNextProps & {
  Element?: React.FunctionComponent<ElementProps>;
  Content?: React.FunctionComponent<ElementProps>;
};

/**
 * Popover
 */
export class PopoverNext extends React.Component<
  PopoverNextProps,
  PopoverNextState
> {
  static displayName = 'Popover';

  static defaultProps = {
    flip: true,
    fixed: false,
    zIndex: 1000,
    onClickOutside: () => ({}),
  };

  static Element = createComponentThatRendersItsChildren('Popover.Element');
  static Content = createComponentThatRendersItsChildren('Popover.Content');

  targetRef: HTMLElement = null;
  portalNode: HTMLElement = null;
  stylesObj: AttributeMap = null;
  appendToNode: HTMLElement = null;
  clickOutsideRef: any = null;
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
      loaded: false,
    };
    this.clickOutsideRef = React.createRef();
    this.contentHook = `popover-content-${props['data-hook'] || ''}-${testId}`;
  }

  _handleClickOutside = () => {
    const { onClickOutside } = this.props;
    onClickOutside && onClickOutside();
  };

  renderPopperContent(childrenObject) {
    const { timeout } = this.props;

    const shouldAnimate = shouldAnimatePopover(timeout);

    const grabScheduleUpdater = scheduleUpdate => {
      this.popperScheduleUpdate = scheduleUpdate;
    };

    const onLoad = () => {
      /** we don't want to rerender so we set it silently */
      this.clickOutsideRef.current.setAttribute('data-loaded', 'true');
    };

    const detachSyles = () =>
      detachStylesFromNode(this.portalNode, this.stylesObj);

    const { shown } = this.state;

    return (
      <Popper
        portalNode={this.portalNode}
        shouldAnimate={shouldAnimate}
        contentHook={this.contentHook}
        onLoad={onLoad}
        shown={shown}
        grabScheduleUpdater={grabScheduleUpdater}
        detachSyles={detachSyles}
        {...this.props}
      >
        {childrenObject.Content}
      </Popper>
    );
  }

  applyStylesToPortaledNode() {
    const { shown } = this.state;
    const { timeout } = this.props;

    const shouldAnimate = shouldAnimatePopover(timeout);

    if (shouldAnimate || shown) {
      attachStylesToNode(this.portalNode, this.stylesObj);
    } else {
      detachStylesFromNode(this.portalNode, this.stylesObj);
    }
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
      this.portalNode.setAttribute('data-loaded', 'false');
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
      const { ['data-hook']: omitted, ...rest } = this.props;
      this.stylesObj = style('root', {}, rest);

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
      style: inlineStyles,
      id,
      timeout,
      excludeClass,
    } = this.props;
    const { isMounted, shown } = this.state;

    const childrenObject = buildChildrenObject(children, {
      Element: null,
      Content: null,
    });

    const shouldAnimate = shouldAnimatePopover(timeout);
    const shouldRenderPopper = isMounted && (shouldAnimate || shown);

    return (
      <Manager>
        <ClickOutside
          rootRef={this.clickOutsideRef}
          onClickOutside={shown ? this._handleClickOutside : undefined}
          excludeClass={excludeClass ? excludeClass : style.popover}
        >
          <div
            ref={this.clickOutsideRef}
            style={inlineStyles}
            data-hook={this.props['data-hook']}
            data-content-hook={this.contentHook}
            {...style('root', {}, this.props)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            id={id}
          >
            <Reference innerRef={r => (this.targetRef = r)}>
              {({ ref }) => (
                <div
                  ref={ref}
                  className={style.popoverElement}
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
