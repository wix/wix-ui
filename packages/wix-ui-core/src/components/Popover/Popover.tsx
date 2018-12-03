import * as React from 'react';
import PopperJS from 'popper.js';
import {getScrollParent} from 'popper.js/dist/umd/popper-utils';
import {Manager, Reference, Popper} from 'react-popper';
import {CSSTransition} from 'react-transition-group';
import {Portal} from 'react-portal';
import style from './Popover.st.css';

import {
  buildChildrenObject,
  createComponentThatRendersItsChildren,
  ElementProps
} from '../../utils';

import {
  attachStylesToNode,
  detachStylesFromNode
} from '../../utils/stylableUtils';

import * as classNames from 'classnames';
import isElement = require('lodash/isElement');

// This is here and not in the test setup because we don't want consumers to need to run it as well
const isTestEnv = process.env.NODE_ENV === 'test';
if (isTestEnv && typeof document !== 'undefined') {
  if (!document.createRange) {
    document.createRange = () => ({
      setStart: () => null,
      setEnd: () => null,
      commonAncestorContainer: document.documentElement.querySelector('body')
    } as any);
  }
}

export type Placement = PopperJS.Placement;
export type AppendTo = PopperJS.Boundary | 'parent' | Element;

export interface PopoverProps {
  className?: string;
  /** The location to display the content */
  placement: Placement;
  /** Is the content shown or not */
  shown: boolean;
  /** onClick on the component */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** onMouseEnter on the component */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /** onMouseLeave on the component */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /** onKeyDown on the target component */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Show show arrow from the content */
  showArrow?: boolean;
  /** Moves popover relative to the parent */
  moveBy?: { x: number, y: number };
  /** Fade Delay */
  hideDelay?: number;
  /** Show Delay */
  showDelay?: number;
  /** Moves arrow by amount */
  moveArrowTo?: number;
  /** Enables calculations in relation to a dom element */
  appendTo?: AppendTo;
  /** Animation timer */
  timeout?: number;
  /** Inline style */
  style?: object;
  /** Id */
  id?: string;
}

export type PopoverState = {
  isMounted: boolean;
};

export type PopoverType = PopoverProps & {
  Element?: React.SFC<ElementProps>;
  Content?: React.SFC<ElementProps>;
};

const getArrowShift = (shift: number | undefined, direction: string) => {
  if (!shift && !isTestEnv) {
    return {};
  }

  return {
    [direction === 'top' || direction === 'bottom' ? 'left' : 'top']: `${shift}px`
  };
};

const createModifiers = ({moveBy, appendTo}) => {
  const modifiers: PopperJS.Modifiers = {
    offset: {
      offset: `${moveBy ? moveBy.x : 0}px, ${moveBy ? moveBy.y : 0}px`
    }
  };

  if (isTestEnv) {
    modifiers.computeStyle = {enabled: false};
  }

  if (appendTo) {
    modifiers.preventOverflow = {
      boundariesElement: appendTo
    };
  }

  return modifiers;
};

function getAppendToNode({appendTo, targetRef}) {
  let appendToNode;
  if (appendTo === 'window' || appendTo === 'viewport') {
    appendToNode = document.body;
  } else if (appendTo === 'scrollParent') {
    appendToNode = getScrollParent(targetRef);
  } else if (isElement(appendTo)) {
    appendToNode = appendTo;
  } else {
    appendToNode = null;
  }
  return appendToNode;
};

const shouldAnimatePopover = ({timeout}: PopoverProps) => !!timeout;

/**
 * Popover
 */
export class Popover extends React.Component<PopoverProps, PopoverState> {
  static displayName = 'Popover';

  static Element = createComponentThatRendersItsChildren('Popover.Element');
  static Content = createComponentThatRendersItsChildren('Popover.Content');

  targetRef: HTMLElement = null;
  portalNode: HTMLElement = null;
  stylesObj: AttributeMap = null;
  appendToNode: HTMLElement = null;

  popperScheduleUpdate: () => void = null

  state = {
    isMounted: false
  };

  getPopperContentStructure(childrenObject) {
    const {moveBy, appendTo, placement, showArrow, moveArrowTo} = this.props;
    const modifiers = createModifiers({moveBy, appendTo});

    const popper = (
      <Popper
        modifiers={modifiers}
        placement={placement}
      >
        {({ ref, style: popperStyles, placement: popperPlacement, arrowProps, scheduleUpdate }) => {
          this.popperScheduleUpdate = scheduleUpdate;

          return (
            <div
              ref={ref}
              data-hook="popover-content"
              style={popperStyles}
              data-placement={popperPlacement || placement}
              className={classNames(style.popover, {[style.withArrow]: showArrow, [style.popoverContent]: !showArrow})}
            >
              {
                showArrow ?
                  [
                    this.renderArrow(arrowProps, moveArrowTo, popperPlacement),
                    <div key="popover-content" className={style.popoverContent}>{childrenObject.Content}</div>
                  ] :
                  <div key="popover-content">{childrenObject.Content}</div>
              }
            </div>
          )
        }}
      </Popper>
    );

    return this.wrapWithAnimations(popper);
  }

  applyStylesToPortaledNode() {
    const {shown} = this.props;
    const shouldAnimate = shouldAnimatePopover(this.props);

    if (shouldAnimate || shown) {
      attachStylesToNode(this.portalNode, this.stylesObj);
    } else {
      detachStylesFromNode(this.portalNode, this.stylesObj);
    }
  }

  wrapWithAnimations(popper) {
    const {timeout, shown} = this.props;
    const shouldAnimate = shouldAnimatePopover(this.props);
    return shouldAnimate ? (
      <CSSTransition
        in={shown}
        timeout={Number(timeout)}
        unmountOnExit
        classNames={style.popoverAnimation}
        onExited={() => detachStylesFromNode(this.portalNode, this.stylesObj)}
      >
        {popper}
      </CSSTransition>
    ) :
      popper;
  }

  renderPopperContent(childrenObject) {
    const popper = this.getPopperContentStructure(childrenObject);

    return (
      this.portalNode ? (
        <Portal node={this.portalNode}>
          {popper}
        </Portal>
      ) :
        popper
    );
  }

  renderArrow(arrowProps, moveArrowTo, placement) {
    return (
      <div
        ref={arrowProps.ref}
        key="popover-arrow"
        data-hook="popover-arrow"
        className={style.arrow}
        style={{
          ...arrowProps.style,
          ...getArrowShift(moveArrowTo, placement)
        }}
      />
    )
  }

  componentDidMount() {
    this.initAppendToNode();
    this.setState({isMounted: true});
  }

  initAppendToNode() {
    const {appendTo} = this.props;
    this.appendToNode = getAppendToNode({appendTo, targetRef: this.targetRef});
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
        height:0
      });
      this.appendToNode.appendChild(this.portalNode);
    }
  }

  componentWillUnmount() {
    if (this.portalNode) {
      // FIXME: What if component is updated with a different appendTo? It is a far-fetched use-case,
      // but we would need to remove the portaled node, and created another one.
      this.appendToNode.removeChild(this.portalNode);
    }
    this.portalNode = null;
  }

  updatePosition() {
    if (this.popperScheduleUpdate) {
      this.popperScheduleUpdate();
    }
  }

  componentDidUpdate() {
    if (this.portalNode) {
      // Re-calculate the portal's styles
      this.stylesObj = style('root', {}, this.props);

      // Apply the styles to the portal
      this.applyStylesToPortaledNode();
    }

    // Update popper's position
    this.updatePosition();
  }

  render() {
    const {onMouseEnter, onMouseLeave, onKeyDown, onClick, children, shown, style: inlineStyles, id} = this.props;
    const {isMounted} = this.state;

    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});

    const shouldAnimate = shouldAnimatePopover(this.props);
    const shouldRenderPopper = isMounted && (shouldAnimate || shown);

    return (
      <Manager>
        <div
          style={inlineStyles}
          {...style('root', {}, this.props)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          id={id}
        >
          <Reference innerRef={r => this.targetRef = r}>
            {({ref}) => (
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
      </Manager>
    );
  }
}
