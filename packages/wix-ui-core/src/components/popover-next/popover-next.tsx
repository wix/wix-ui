import * as React from 'react';
import * as memoizeOneModule from 'memoize-one';
import loadable from '@loadable/component';

import { Placement, Boundary } from 'popper.js';
import { Manager, Reference } from 'react-popper';

import { ClickOutside } from '../click-outside';
import { MoveBy } from '../popover/utils/getModifiers';
import ErrorBoundary from './components/ErrorBoundary';
import CSSTransition from './components/CSSTransition';
import Loader from './components/Loader';
import Portal from './components/Portal';
import { PopperProps } from './components/Popper';

import { style, classes } from '../popover/Popover.st.css';

import {
  buildChildrenObject,
  createComponentThatRendersItsChildren,
  ElementProps,
} from '../../utils';

import { getPopoverTestUtils } from '../popover/utils/getPopoverTestUtils';
import { mapPopperAppendTo } from '../popover/utils/mapPopperAppendTo';
import {
  getAppendToElement,
  Predicate,
} from '../popover/utils/getAppendToElement';
import { shouldAnimatePopover } from '../popover/utils/shouldAnimatePopover';

// This is here and not in the test setup because we don't want consumers to need to run it as well
let testId;
const isTestEnv = process.env.NODE_ENV === 'test';

if (isTestEnv && typeof document !== 'undefined' && !document.createRange) {
  getPopoverTestUtils.createRange();
}

if (isTestEnv) {
  testId = getPopoverTestUtils.generateId();
}

// there is an issue with memoize-one package with typescript projects
// https://github.com/alexreardon/memoize-one/pull/40
const memoizeOne = memoizeOneModule.default || memoizeOneModule;

type LoadablePopper = PopperProps & { fallback: any };

const lazyPopperFactory = (memoizeOne as any)(key =>
  process.env.NODE_ENV === 'test'
    ? require('./components/Popper').default
    : loadable(() =>
        import(
          /* webpackPrefetch: true, webpackChunkName: "wuc-popover-next" */ './components/Popper'
        ),
      ),
) as (key: number) => React.ComponentType<LoadablePopper>;

const attachClasses = (node: HTMLElement, classNames: string) =>
  node && node.classList.add(...classNames.split(' '));
const detachClasses = (node: HTMLElement, classNames: string) =>
  node && node.classList.remove(...classNames.split(' '));

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
  moveBy?: MoveBy;
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
  /* stretch trigger element to the width of its container. */
  fluid?: boolean;
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
  cacheId: number;
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
  portalClasses: string;
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
      cacheId: 1,
    };
    this.clickOutsideRef = React.createRef();
    this.contentHook = `popover-content-${props['data-hook'] || ''}-${testId}`;
  }

  _handleClickOutside = () => {
    const { onClickOutside } = this.props;
    onClickOutside && onClickOutside();
  };

  renderPopperContent(childrenObject) {
    const { shown, cacheId } = this.state;

    const grabScheduleUpdater = scheduleUpdate =>
      (this.popperScheduleUpdate = scheduleUpdate);

    const detachStyles = () =>
      detachClasses(this.portalNode, this.portalClasses);

    const shouldAnimate = shouldAnimatePopover(this.props.timeout);

    const appendTo = mapPopperAppendTo(this.props.appendTo);

    const Popper = lazyPopperFactory(cacheId);

    // Here we need to put React.Suspense under the CSSTransition wrapper
    // because CSSTransition still uses findDomNode which causes this part to fail with suspense.
    // The issues is fixed in React 16.9.0.
    // Current downside of this that we are not able to render Loader when appendTo="window".
    return (
      <Portal node={this.portalNode}>
        <CSSTransition
          timeout={this.props.timeout}
          shouldAnimate={shouldAnimate}
          detachStyles={detachStyles}
          shown={shown}
        >
          <Popper
            {...this.props}
            fallback={<Loader />}
            appendTo={appendTo}
            isTestEnv={isTestEnv}
            contentHook={this.contentHook}
            grabScheduleUpdater={grabScheduleUpdater}
            shouldAnimate={shouldAnimate}
          >
            {childrenObject.Content}
          </Popper>
        </CSSTransition>
      </Portal>
    );
  }

  applyStylesToPortaledNode() {
    const { shown } = this.state;
    const { timeout } = this.props;

    const shouldAnimate = shouldAnimatePopover(timeout);

    if (shouldAnimate || shown) {
      attachClasses(this.portalNode, this.portalClasses);
    } else {
      detachClasses(this.portalNode, this.portalClasses);
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

  recoverFromError = event =>
    this.setState(
      state => ({
        cacheId: state.cacheId + 1,
      }),
      () => this.props.onMouseLeave && this.props.onMouseLeave(event),
    );

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
      this.portalClasses = style(classes.root, {}, rest.className);

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
      excludeClass,
      timeout,
      fluid,
    } = this.props;
    const { isMounted, shown } = this.state;

    const childrenObject = buildChildrenObject(children, {
      Element: null,
      Content: null,
    });

    const shouldAnimate = shouldAnimatePopover(timeout);
    /**
     * (shouldAnimate || shown) - the shouldAnimate boolean will determine if
     *  rendering popoer control will be passed to CSSTransition
     **/
    const shouldRenderPopper = isMounted && (shouldAnimate || shown);

    return (
      <ErrorBoundary key={this.state.cacheId} onRetry={this.recoverFromError}>
        <Manager>
          <ClickOutside
            rootRef={this.clickOutsideRef}
            onClickOutside={shown ? this._handleClickOutside : undefined}
            excludeClass={excludeClass ? excludeClass : classes.popover}
          >
            <div
              ref={this.clickOutsideRef}
              style={inlineStyles}
              data-hook={this.props['data-hook']}
              data-content-hook={this.contentHook}
              className={style(classes.root, { fluid }, this.props.className)}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              id={id}
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
      </ErrorBoundary>
    );
  }
}
