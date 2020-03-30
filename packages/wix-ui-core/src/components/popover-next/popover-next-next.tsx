import * as React from 'react';
import PopperJS from 'popper.js';

import {
  createComponentThatRendersItsChildren,
  buildChildrenObject,
} from '../../utils';
import {
  detachStylesFromNode,
  attachStylesToNode,
} from '../../utils/stylableUtils';

import { testId } from './utils';
import { Manager, Trigger, Content } from './controllers';

import { getAppendToElement, Predicate } from './utils/getAppendToElement';
import { getModifiers } from './utils/getModifiers';
import { shouldAnimatePopover } from './utils/shouldAnimatePopover';

import style from '../popover/Popover.st.css';

export type AppendTo = PopperJS.Boundary | 'parent' | Element | Predicate;
export type MoveBy = Partial<{ x: number; y: number }>;

export interface PopoverNextProps {
  /** hook for testing purposes */
  'data-hook'?: string;
  /** custom classname */
  className?: string;
  /** The location to display the content */
  placement: PopperJS.Placement;
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
  /** Custom arrow element */
  customArrow?(
    placement: PopperJS.Placement,
    arrowProps: object,
  ): React.ReactNode;
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

export const PopoverNext = props => {
  //props and states
  const [shown, setShown] = React.useState(false);
  const [cacheId, setCacheId] = React.useState(1);
  const [isMounted, setMounted] = React.useState(false);

  const { timeout, hideDelay, showDelay } = props;

  //refs
  const referenceRef = React.createRef<HTMLDivElement>();

  //local variables
  const contentHook = `popover-content-${props['data-hook'] || ''}-${testId}`;
  const shouldAnimate = shouldAnimatePopover(timeout);
  let portalNode = null;
  let stylesObj = null;
  let appendToNode: HTMLElement = null;
  let popperScheduleUpdate: Function = null;
  let _hideTimeout = null;
  let _showTimeout = null;

  //local handlers
  const detachStyles = () => detachStylesFromNode(portalNode, stylesObj);

  const grabScheduleUpdater = scheduleUpdate =>
    (popperScheduleUpdate = scheduleUpdate);

  const applyStylesToPortaledNode = () => {
    if (shouldAnimate || shown) {
      attachStylesToNode(portalNode, stylesObj);
    } else {
      detachStylesFromNode(portalNode, stylesObj);
    }
  };

  const updatePosition = () => {
    if (popperScheduleUpdate) {
      popperScheduleUpdate();
    }
  };

  const hidePopover = () => {
    if (!isMounted || _hideTimeout) {
      return;
    }

    if (_showTimeout) {
      clearTimeout(_showTimeout);
      _showTimeout = null;
    }

    if (hideDelay) {
      _hideTimeout = setTimeout(() => setShown(false), hideDelay);
      return;
    }

    return setShown(false);
  };

  const showPopover = () => {
    if (!isMounted || _showTimeout) {
      return;
    }

    if (_hideTimeout) {
      clearTimeout(_hideTimeout);
      _hideTimeout = null;
    }

    if (showDelay) {
      _showTimeout = setTimeout(() => setShown(true), showDelay);
      return;
    }

    return setShown(true);
  };

  // component sideEffects

  //componentDidMount && componentWillUnmount
  React.useEffect(() => {
    const { appendTo } = props;
    appendToNode = getAppendToElement(appendTo, referenceRef.current);

    if (appendToNode) {
      portalNode = document.createElement('div');
      portalNode.setAttribute('data-hook', 'popover-portal');
      portalNode.setAttribute('data-loaded', 'false');
      /**
       * reset overlay wrapping layer
       * so that styles from copied classnames
       * won't break the overlay:
       * - content is position relative to body
       * - overlay layer is hidden
       */
      Object.assign(portalNode.style, {
        position: 'static',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      });
      appendToNode.appendChild(portalNode);
    }

    setMounted(true);
    setShown(props.shown);

    return () => {
      if (portalNode && appendToNode.children.length) {
        appendToNode.removeChild(portalNode);
      }
      portalNode = null;
      setMounted(false);
      setShown(false);
    };
  }, []);

  //componentDidUpdate
  React.useEffect(() => {
    if (portalNode) {
      // Re-calculate the portal's styles
      const { ['data-hook']: omitted, ...rest } = props;
      stylesObj = style('root', {}, rest);
      // Apply the styles to the portal
      applyStylesToPortaledNode();
    }

    if (props.shown) {
      showPopover();
    } else {
      hidePopover();
    }
  }, [props.shown]);

  React.useEffect(() => updatePosition());

  //callback handlers
  const { onClickOutside, onMouseLeave } = props;

  const _onClickOutside = () => onClickOutside && onClickOutside();

  const _onErrorRecovery = () => {
    onMouseLeave && onMouseLeave();
    setCacheId(cacheId + 1);
  };

  const children = buildChildrenObject(props.children, {
    Element: null,
    Content: null,
  });

  // controlling modifiers for popper
  const modifiers = getModifiers({ ...props, shouldAnimate });

  // props for components
  const {
    ['data-hook']: dataHook,
    role,
    id,
    onMouseEnter,
    onClick,
    onKeyDown,
    customArrow,
    moveArrowTo,
    showArrow,
    placement,
  } = props;

  return (
    <Manager
      {...props}
      cacheId={cacheId}
      dataHook={dataHook}
      data-content-hook={contentHook}
      onClickOutside={_onClickOutside}
      onErrorRecovery={_onErrorRecovery}
    >
      <Trigger
        referenceRef={referenceRef}
        dataHook="popover-element"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
      >
        {children.Element}
      </Trigger>
      <Content
        shown={shown}
        portalNode={portalNode}
        popperOptions={{ placement }}
        dataHook="popover-content"
        cacheId={cacheId}
        contentHook={contentHook}
        modifiers={modifiers}
        grabScheduleUpdater={grabScheduleUpdater}
        animationOptions={{
          animate: shouldAnimate,
          onAnimationExit: detachStyles,
          timeout,
        }}
        arrowOptions={{ customArrow, moveArrowTo, showArrow }}
        accesibilityOptions={{ id, role }}
      >
        {children.Content}
      </Content>
    </Manager>
  );
};

PopoverNext.defaultProps = {
  flip: true,
  fixed: false,
  zIndex: 1000,
  onClickOutside: () => ({}),
};

PopoverNext.Element = createComponentThatRendersItsChildren('Popover.Element');
PopoverNext.Content = createComponentThatRendersItsChildren('Popover.Content');

PopoverNext.displayName = 'Popover';
