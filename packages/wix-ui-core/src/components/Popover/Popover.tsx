import * as React from 'react';
import PopperJS from 'popper.js';
import {getScrollParent} from 'popper.js/dist/umd/popper-utils';
import style from './Popover.st.css';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {CSSTransition} from 'react-transition-group';
import {Portal} from 'react-portal';
import {buildChildrenObject, createComponentThatRendersItsChildren, ElementProps} from '../../utils';
import camelCase = require('lodash/camelCase');
import isElement = require('lodash/isElement');
import * as classNames from 'classnames';

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
  moveBy?: {x: number, y: number};
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

//TODO - needs some refactoring
const attachStylesToNode = ({node, stylesObj}) => {
  if (node) {
    node.classList.add(stylesObj.className);
    Object.keys(stylesObj)
      .filter(key => key.startsWith('data-'))
      .map(key => key.replace(/$data-/, ''))
      .forEach(key => node.dataset[camelCase(key)] = stylesObj[key]);
  }
};

//TODO - needs some refactoring
const detachStylesFromNode = ({node, stylesObj}) => {
  if (node) {
    node.classList.remove(stylesObj.className);
    Object.keys(stylesObj)
      .filter(key => key.startsWith('data-'))
      .map(key => key.replace(/$data-/, ''))
      .forEach(key => delete node.dataset[camelCase(key)]);
  }
};

/**
 * Popover
 */
export class Popover extends React.Component<PopoverType, PopoverState> {
  static Element = createComponentThatRendersItsChildren('Popover.Element');
  static Content = createComponentThatRendersItsChildren('Popover.Content');
  static defaultProps = {
    timeout: 150
  };

  targetRef = null;
  mountingNode: HTMLElement = null;
  stylesObj: any = null;

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      isMounted: false
    };
  }

  renderPopper = ({modifiers, placement, showArrow, moveArrowTo, childrenObject}) => {
    const popper = (
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

    attachStylesToNode({node: this.mountingNode, stylesObj: this.stylesObj});

    return (
      this.mountingNode ?
        <Portal node={this.mountingNode}>
          {popper}
        </Portal> :
        popper
    );
  };

  componentDidMount() {
    this.setState({isMounted: true});
  }

  componentWillUnmount() {
    detachStylesFromNode({node: this.mountingNode, stylesObj: this.stylesObj});
  }

  render() {
    const {
      placement,
      shown,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      onClick,
      showArrow,
      children,
      moveBy,
      moveArrowTo,
      timeout,
      appendTo
    } = this.props;

    const {isMounted} = this.state;

    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const modifiers = createModifiers({moveBy, appendTo});
    this.stylesObj = style('root', {}, this.props);
    this.mountingNode = getMountingNode({appendTo, targetRef: this.targetRef});

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
          !!timeout && isMounted &&
          <CSSTransition in={shown} timeout={Number(timeout)} unmountOnExit={true} classNames={style.popoverAnimation}>
            {this.renderPopper({modifiers, placement, showArrow, moveArrowTo, childrenObject})}
          </CSSTransition>
        }
        {
          !timeout && shown && isMounted &&
          this.renderPopper({modifiers, placement, showArrow, moveArrowTo, childrenObject})
        }
      </Manager>
    );
  }
}
