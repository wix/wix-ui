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
import * as classNames from 'classnames';
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

  getPopperContentStructure(childrenObject) {
    const {appendTo, placement, showArrow, moveArrowTo} = this.props;
    const modifiers = createModifiers({moveBy, appendTo});

    let popper = (
      <Popper
        data-hook="popover-content"
        modifiers={modifiers}
        placement={placement}
        className={classNames(style.popover, {[style.withArrow]: showArrow, [style.popoverContent]: !showArrow})}>
        {
          showArrow ?
            [
              <Arrow data-hook="popover-arrow" className={style.arrow} style={getArrowShift(moveArrowTo, placement)}/>,
              <div className={style.popoverContent}>{childrenObject.Content}</div>
            ] :
            childrenObject.Content
        }
      </Popper>
    );

    return this.wrapWithAnimations(popper);
  }

  attachOrDetachStyles(props) {
    const {shown, timeout} = props;
    const shouldAnimate = !!timeout;

    if (this.mountingNode) {
      if (shouldAnimate) {
        attachStylesToNode(this.mountingNode, this.stylesObj);
      } else if (shown) {
        attachStylesToNode(this.mountingNode, this.stylesObj);
      } else {
        detachStylesFromNode(this.mountingNode, this.stylesObj);
      }
    }
  }

  wrapWithAnimations(popper) {
    const {timeout, shown} = this.props;
    const shouldAnimate = !!timeout;
    return shouldAnimate ?
      <CSSTransition
        in={shown}
        timeout={Number(timeout)}
        unmountOnExit={true}
        classNames={style.popoverAnimation}
        onExited={() => detachStylesFromNode(this.mountingNode, this.stylesObj)}
      >
        {popper}
      </CSSTransition> :
      popper;
  }

  renderPopperContent(childrenObject) {
    const popper = this.getPopperContentStructure(childrenObject);

    return (
      this.mountingNode ?
        <Portal node={this.mountingNode}>
          {popper}
        </Portal> :
        popper
    );
  }

  defineMountingNode(props) {
    const {appendTo} = props;
    this.mountingNode = getMountingNode({appendTo, targetRef: this.targetRef});
    this.stylesObj = style('root', {}, props);
    this.attachOrDetachStyles(props);
  }

  componentDidMount() {
    this.defineMountingNode(this.props);
    this.setState({isMounted: true});
  }

  componentWillReceiveProps(nextProps) {
    this.defineMountingNode(this.props);
  }

  render() {
    const {onMouseEnter, onMouseLeave, onKeyDown, onClick, children, timeout, shown} = this.props;
    const {isMounted} = this.state;

    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const shouldAnimate = !!timeout;
    const shouldRenderPopper = isMounted && (shouldAnimate || shown);

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
        {shouldRenderPopper && this.renderPopperContent(childrenObject)}
      </Manager>
    );
  }
}
