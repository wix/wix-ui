import * as React from 'react';
import PopperJS from 'popper.js';
import {getScrollParent} from 'popper.js/dist/umd/popper-utils';
import style from './Popover.st.css';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {CSSTransition} from 'react-transition-group';
import {Portal} from 'react-portal';
import {
  attachStylesToNode,
  buildChildrenObject,
  createComponentThatRendersItsChildren,
  detachStylesFromNode,
  ElementProps
} from '../../utils';
import isElement = require('lodash/isElement');

// This is here and not in the test setup because we don't want consumers to need to run it as well
const isTestEnv = process.env.NODE_ENV === 'test';
if (isTestEnv) {
  if (!document.createRange) {
    document.createRange = () => ({
      setStart: () => null,
      setEnd: () => null,
      commonAncestorContainer: document.documentElement.querySelector('body')
    } as any);
  }
}

export type Placement = PopperJS.Placement;
export type AppendTo = PopperJS.Boundary | Element;

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
  /** Moves poppover relative to the parent */
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

const getMountingNode = ({appendTo, targetRef}) => {
  let mountingNode;
  if (appendTo === 'window' || appendTo === 'viewport') {
    mountingNode = document.body;
  } else if (appendTo === 'scrollParent') {
    mountingNode = getScrollParent(targetRef);
  } else if (isElement(appendTo)) {
    mountingNode = appendTo;
  } else {
    mountingNode = null;
  }
  return mountingNode;
};

/**
 * Popover
 */
export class Popover extends React.Component<PopoverType, PopoverState> {
  static Element = createComponentThatRendersItsChildren('Popover.Element');
  static Content = createComponentThatRendersItsChildren('Popover.Content');

  targetRef = null;
  mountingNode: HTMLElement = null;
  stylesObj = null;

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      isMounted: false
    };
  }

  renderPopper = ({modifiers, childrenObject, mountingNode, stylesObj, shouldAnimate}) => {
    const {placement, showArrow, moveArrowTo, timeout, shown} = this.props;
    let popper = (
      <Popper
        data-hook="popover-content"
        modifiers={modifiers}
        placement={placement}
        className={`${style.popover} ${showArrow ? style.withArrow : style.popoverContent}`}>
        {
          showArrow &&
          <Arrow data-hook="popover-arrow" className={style.arrow} style={getArrowShift(moveArrowTo, placement)}/>
        }
        {
          showArrow &&
          <div className={style.popoverContent}>
            {childrenObject.Content}
          </div>
        }
        {
          !showArrow &&
          childrenObject.Content
        }
      </Popper>
    );

    if (shouldAnimate) {
      popper = (
        <CSSTransition
          in={shown}
          timeout={Number(timeout)}
          unmountOnExit={true}
          classNames={style.popoverAnimation}
          onExited={() => detachStylesFromNode(mountingNode, stylesObj)}
        >
          {popper}
        </CSSTransition>
      );
    }

    return (
      mountingNode ?
        <Portal node={mountingNode}>
          {popper}
        </Portal> :
        popper
    );
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render() {
    const {
      shown,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      onClick,
      children,
      moveBy,
      timeout,
      appendTo
    } = this.props;

    const {isMounted} = this.state;

    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const modifiers = createModifiers({moveBy, appendTo});
    const stylesObj = style('root', {}, this.props);
    const mountingNode = getMountingNode({appendTo, targetRef: this.targetRef});
    const shouldAnimate = !!timeout;
    const shouldRenderPopper = shouldAnimate || shown;

    //TODO - refactor this area
    if (isMounted) {
      if (shouldRenderPopper) {
        attachStylesToNode(mountingNode, stylesObj);
      } else if (!shouldAnimate) {
        detachStylesFromNode(mountingNode, stylesObj);
      }
    }

    return (
      <Manager
        {...style('root manager', {}, this.props)}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <Target onKeyDown={onKeyDown} data-hook="popover-element" className={style.trigger}>
          <span ref={r => this.targetRef = r}>
            {childrenObject.Element}
          </span>
        </Target>
        {
          isMounted && shouldRenderPopper && this.renderPopper({
            modifiers,
            childrenObject,
            mountingNode,
            stylesObj,
            shouldAnimate
          })
        }
      </Manager>
    );
  }
}
