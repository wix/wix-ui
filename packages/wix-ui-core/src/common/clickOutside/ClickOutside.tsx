import * as React from 'react';

export interface ClickOutsideProps {
  /** A reference to the child root element */
  rootRef: React.RefObject<HTMLElement>;

  /** A callback to be triggered when all requirements for "outside click" are met */
  onClickOutside: Function;

  /** Elements with this class will not trigger onClickOutside callback */
  excludeClass?: string;

  /** If true, click events listeners will be removed from document */
  disableOnClickOutside?: boolean;
}

/**
 * Click outside behavior
 */
class ClickOutside extends React.PureComponent<ClickOutsideProps> {
  private readonly _boundEvents: string[];

  constructor(props) {
    super(props);

    this._boundEvents = [];
  }

  /**
   * Register ClickOutside events
   */
  _registerEvents() {
    ['mouseup', 'touchend'].forEach(eventName => {
      document.addEventListener(eventName, this._onClickOutside, true);
      this._boundEvents.push(eventName);
    });
  }

  /**
   * Unregister ClickOutside events
   */
  _unregisterEvents() {
    while (this._boundEvents.length > 0) {
      const eventName = this._boundEvents.pop();
      document.removeEventListener(eventName, this._onClickOutside, true);
    }
  }

  componentDidMount() {
    if (!this.props.disableOnClickOutside) {
      this._registerEvents();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.disableOnClickOutside !== prevProps.disableOnClickOutside) {
      if (this.props.disableOnClickOutside) {
        this._unregisterEvents();
      } else {
        this._registerEvents();
      }
    }
  }

  componentWillUnmount() {
    this._unregisterEvents();
  }

  /**
   * Check whether all requirements for "outside click" are met
   * @param event - Click event
   */
  _isOutsideClick = event => {
    const { rootRef, excludeClass } = this.props;
    let target: HTMLElement = event.target;
    while (target) {
      if (
        rootRef.current === target ||
        target.classList.contains(excludeClass)
      ) {
        return false;
      }
      target = target.parentElement;
    }

    return true;
  };

  /**
   * Triggers onClickOutside callback when clicked outside child
   * @param event - Click event
   */
  _onClickOutside = event => {
    const { onClickOutside } = this.props;
    if (this._isOutsideClick(event)) {
      onClickOutside(event);
    }
  };

  render() {
    return this.props.children;
  }
}

export default ClickOutside;
