import * as React from 'react';
import PopperJS from 'popper.js';
import {getScrollParent} from 'popper.js/dist/umd/popper-utils';
import style from './Popover.st.css';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {CSSTransition} from 'react-transition-group';
import {Portal} from 'react-portal';
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

import {oneOf, oneOfType, any, Requireable, string, bool, func, number, shape} from 'prop-types';

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
export const AppendToPropType = oneOfType([
  oneOf(['scrollParent', 'viewport', 'window']),
  any
]);

export const PlacementsType = oneOf(['auto-start',
  'auto',
  'auto-end',
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-end',
  'bottom',
  'bottom-start',
  'left-end',
  'left',
  'left-start']);

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

const getAppendedNode = ({appendTo, targetRef}) => {
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
export class Popover extends React.Component<PopoverType, PopoverState> {
  static Element = createComponentThatRendersItsChildren('Popover.Element');
  static Content = createComponentThatRendersItsChildren('Popover.Content');

  targetRef: HTMLElement = null;
  appendToNode: HTMLElement = null;
  stylesObj: { [key: string]: string } = null;

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      isMounted: false
    };
  }

  static propTypes = {
    className: string,
    /** The location to display the content */
    placement: PlacementsType,
    /** Is the content shown or not */
    shown: bool,
    /** onClick on the component */
    onClick: func,
    /** onMouseEnter on the component */
    onMouseEnter: func,
    /** onMouseLeave on the component */
    onMouseLeave: func,
    /** onKeyDown on the target component */
    onKeyDown: func,
    /** Show show arrow from the content */
    showArrow: bool,
    /** Moves popover relative to the parent */
    moveBy: shape({x: number, y: number}),
    /** Fade Delay */
    hideDelay: number,
    /** Show Delay */
    showDelay: number,
    /** Moves arrow by amount */
    moveArrowTo: number,
    /** Enables calculations in relation to a dom element */
    appendTo: AppendToPropType,
    /** Animation timer */
    timeout: number
  };

  getPopperContentStructure(childrenObject) {
    const {appendTo, placement, showArrow, moveArrowTo} = this.props;
    const modifiers = createModifiers({moveBy, appendTo});

    let popper = (
      <Popper
        data-hook="popover-content"
        modifiers={modifiers}
        placement={placement}
        className={classNames(style.popover, {[style.withArrow]: showArrow, [style.popoverContent]: !showArrow})}
      >
        {
          showArrow ?
            [
              <Arrow 
                key="popover-arrow"
                data-hook="popover-arrow"
                className={style.arrow}
                style={getArrowShift(moveArrowTo, placement)}
              />,
              <div key="popover-content" className={style.popoverContent}>{childrenObject.Content}</div>
            ] :
            childrenObject.Content
        }
      </Popper>
    );

    return this.wrapWithAnimations(popper);
  }

  applyStylesToAppendedNode(props) {
    const {shown} = props;
    const shouldAnimate = shouldAnimatePopover(props);

    if (shouldAnimate || shown) {
      attachStylesToNode(this.appendToNode, this.stylesObj);
    } else {
      detachStylesFromNode(this.appendToNode, this.stylesObj);
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
        onExited={() => detachStylesFromNode(this.appendToNode, this.stylesObj)}
      >
        {popper}
      </CSSTransition>
    ) :
      popper;
  }

  renderPopperContent(childrenObject) {
    const popper = this.getPopperContentStructure(childrenObject);

    return (
      this.appendToNode ? (
        <Portal node={this.appendToNode}>
          {popper}
        </Portal> 
      ) :
        popper
    );
  }

  handlePortaledPopoverNode(props) {
    const {appendTo} = props;
    this.appendToNode = getAppendedNode({appendTo, targetRef: this.targetRef});
    if (this.appendToNode) {
      this.stylesObj = style('root', {}, props);
      this.applyStylesToAppendedNode(props);
    }
  }

  componentDidMount() {
    this.handlePortaledPopoverNode(this.props);
    this.setState({isMounted: true});
  }

  render() {
    const {onMouseEnter, onMouseLeave, onKeyDown, onClick, children, shown} = this.props;
    const {isMounted} = this.state;

    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const shouldAnimate = shouldAnimatePopover(this.props);
    const shouldRenderPopper = isMounted && (shouldAnimate || shown);

    if (this.appendToNode) {
      this.applyStylesToAppendedNode(this.props);
    }

    return (
      <Manager
        {...style('root manager', {}, this.props)}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Target onKeyDown={onKeyDown} data-hook="popover-element" innerRef={r => this.targetRef = r}>
          {childrenObject.Element}
        </Target>
        {shouldRenderPopper && this.renderPopperContent(childrenObject)}
      </Manager>
    );
  }
}
