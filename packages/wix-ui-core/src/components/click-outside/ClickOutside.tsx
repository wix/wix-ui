import * as React from 'react';

export interface ClickOutsideProps {
  /** A reference to the child root element */
  rootRef: React.RefObject<HTMLElement>;

  /** A callback to be triggered when all requirements for "outside click" are met */
  onClickOutside?: Function;

  /** Elements with this class will not trigger onClickOutside callback */
  excludeClass?: string;

  /** useCapture | options object, specifies characteristics about the event listener */
  options?: boolean | AddEventListenerOptions;
}

/**
 * Click outside behavior
 */
export class ClickOutside extends React.PureComponent<ClickOutsideProps> {
  private readonly _boundEvents: string[];

  constructor(props) {
    super(props);

    this._boundEvents = [];
  }

  /**
   * Register ClickOutside events
   */
  _registerEvents() {
    const { options } = this.props;
    ['mouseup', 'touchend'].forEach(eventName => {
      document.addEventListener(eventName, this._onClickOutside, options);
      this._boundEvents.push(eventName);
    });
  }

  /**
   * Unregister ClickOutside events
   */
  _unregisterEvents() {
    const { options } = this.props;
    while (this._boundEvents.length > 0) {
      const eventName = this._boundEvents.pop();
      document.removeEventListener(eventName, this._onClickOutside, options);
    }
  }

  componentDidMount() {
    if (this.props.onClickOutside) {
      this._registerEvents();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.onClickOutside !== prevProps.onClickOutside) {
      if (this.props.onClickOutside) {
        this._registerEvents();
      } else {
        this._unregisterEvents();
      }
    }
  }

  componentWillUnmount() {
    this._unregisterEvents();
  }

  /**
   * Check whether the click is inside the element or excluded
   * @param event - Click event
   */
  _isInsideClick = event => {
    const { rootRef, excludeClass } = this.props;
    let target: HTMLElement = event.target;
    while (target) {
      if (
        rootRef.current === target ||
        (excludeClass &&
          target.classList &&
          target.classList
            .toString()
            .split(' ')
            .some(c => excludeClass.split(' ').includes(c)))
      ) {
        return true;
      }
      target = target.parentElement;
    }
  };

  /**
   * Triggers onClickOutside callback when clicked outside child
   * @param event - Click event
   */
  _onClickOutside = event => {
    const { onClickOutside } = this.props;
    if (!this._isInsideClick(event)) {
      onClickOutside(event);
    }
  };

  render() {
    return this.props.children;
  }
}
