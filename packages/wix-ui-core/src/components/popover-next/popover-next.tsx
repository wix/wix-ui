import * as React from 'react';
import PopperJS from 'popper.js';

import {
  createComponentThatRendersItsChildren,
  buildChildrenObject,
} from '../../utils';

import { generateTestID } from './utils';
import { Manager, Trigger, Content } from './controllers';

type Predicate = (s: Element) => boolean;
type AppendTo = PopperJS.Boundary | 'parent' | Element | Predicate;
type MoveBy = Partial<{ x: number; y: number }>;

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

  //refs
  const referenceRef = React.createRef<HTMLDivElement>();

  //local variables
  const contentHook = `popover-content-${props['data-hook'] ||
    ''}-${generateTestID()}`;

  const popperScheduleUpdate = React.useRef<Function>();
  const _hideTimeout = React.useRef<any>();
  const _showTimeout = React.useRef<any>();

  //local handlers
  const { hideDelay, showDelay } = props;

  const grabScheduleUpdater = scheduleUpdate =>
    (popperScheduleUpdate.current = scheduleUpdate);

  const updatePosition = () => {
    if (popperScheduleUpdate.current) {
      popperScheduleUpdate.current();
    }
  };

  const hidePopover = () => {
    if (!isMounted || _hideTimeout) {
      return;
    }

    if (_showTimeout.current) {
      clearTimeout(_showTimeout.current);
      _showTimeout.current = null;
    }

    if (hideDelay) {
      _hideTimeout.current = setTimeout(() => setShown(false), hideDelay);
      return;
    }

    return setShown(false);
  };

  const showPopover = () => {
    if (!isMounted || _showTimeout) {
      return;
    }

    if (_hideTimeout.current) {
      clearTimeout(_hideTimeout.current);
      _hideTimeout.current = null;
    }

    if (showDelay) {
      _showTimeout.current = setTimeout(() => setShown(true), showDelay);
      return;
    }

    return setShown(true);
  };

  //componentDidMount && unmount
  React.useEffect(() => {
    setMounted(true);
    setShown(props.shown);
    return () => {
      setMounted(false);

      if (_hideTimeout) {
        clearTimeout(_hideTimeout.current);
        _hideTimeout.current = null;
      }

      if (_showTimeout) {
        clearTimeout(_showTimeout.current);
        _showTimeout.current = null;
      }
    };
  }, []);

  //componentDidUpdate
  React.useEffect(() => {
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

  // props for components
  const { ['data-hook']: dataHook, onMouseEnter, onClick, onKeyDown } = props;

  return (
    <Manager
      {...props}
      cacheId={cacheId}
      dataHook={dataHook}
      contentHook={contentHook}
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
        {...props}
        dataHook="popover-content"
        shown={shown}
        isMounted={isMounted}
        cacheId={cacheId}
        contentHook={contentHook}
        referenceRef={referenceRef}
        grabScheduleUpdater={grabScheduleUpdater}
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
