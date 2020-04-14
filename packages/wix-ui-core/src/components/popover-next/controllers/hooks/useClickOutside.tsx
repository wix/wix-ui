import * as React from 'react';

export function useClickOutside(ref, callback, options) {
  const boundEvents = React.useRef<any>([]);

  /**
   * Check whether the click is inside the element or excluded
   * @param event - Click event
   */
  const isInsideClick = event => {
    const { excludeClass } = options;

    let target: HTMLElement = event.target;
    while (target) {
      if (
        ref.current === target ||
        (target.classList && target.classList.contains(excludeClass))
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
  const onClickOutside = event => {
    if (!isInsideClick(event)) {
      callback(event);
    }
  };

  /**
   * Register ClickOutside events
   */
  const registerEvents = () => {
    ['mouseup', 'touchend'].forEach(eventName => {
      document.addEventListener(eventName, onClickOutside);
      boundEvents.current.push(eventName);
    });
  };

  /**
   * Unregister ClickOutside events
   */
  const unregisterEvents = () => {
    while (boundEvents.current.length > 0) {
      const eventName = boundEvents.current.pop();
      document.removeEventListener(eventName, onClickOutside);
    }
  };

  React.useEffect(() => {
    if (callback) {
      registerEvents();
    }
    return () => unregisterEvents();
  }, []);

  React.useEffect(() => {
    if (callback) {
      registerEvents();
    } else {
      unregisterEvents();
    }
  }, [callback]);
}
