import * as React from 'react';
import hoistNonReactMethods from 'hoist-non-react-methods';

import { getDisplayName } from '../utils';
import { style, classes, cssStates } from './Focusable.st.css';
import { isStatelessComponent } from '../../utils';

type SubscribeCb = () => void;

/**
 * Singleton for managing current input method (keyboard or mouse).
 */
const inputMethod = new (class {
  // Default is keyboard in case an element is focused programmatically.
  method: 'mouse' | 'keyboard' = 'keyboard';
  subscribers: Map<any, SubscribeCb> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', () => this.setMethod('mouse'));
      window.addEventListener('keydown', () => this.setMethod('keyboard'));
      // We need to listen on keyUp, in case a TAB is made from the browser's address-bar,
      // so the keyDown is not fired, only the keyUp.
      window.addEventListener('keyup', () => this.setMethod('keyboard'));
    }
  }

  subscribe = (target: any, callback: SubscribeCb) =>
    this.subscribers.set(target, callback);

  unsubscribe = (target: any) => this.subscribers.delete(target);

  /**
   * Is the current input method `keyboard`. if `false` is means it is `mouse`
   */
  isKeyboard = () => this.method === 'keyboard';

  setMethod(method) {
    if (method !== this.method) {
      this.method = method;
      this.subscribers.forEach(f => f());
    }
  }
})();

/*
 * TODO: Consider adding 'disabled' state to this HOC, since:
 * - When component is focused and then it becomes disabled, then the focus needs to be blured.
 *
 * TODO: Consider using [Recompose](https://github.com/acdlite/recompose/tree/master/src/packages/recompose) to do:
 *  - the static hoisting
 *  - set displayName
 */
export const withFocusable = Component => {
  interface IFocusableHOCState {
    focus: boolean;
    focusVisible: boolean;
  }

  class FocusableHOC extends React.Component<any, IFocusableHOCState> {
    static displayName = getDisplayName(Component);
    static defaultProps = Component.defaultProps;

    focusedByMouse = false;
    wrappedComponentRef = null;

    state = {
      focus: false,
      focusVisible: false,
    };

    componentWillUnmount() {
      inputMethod.unsubscribe(this);
    }

    componentDidUpdate(prevProps) {
      /*
        in case when button was focused and then become disabled,
        we need to trigger blur logic and remove all listers, as disabled button
        do not trigger onFocus and onBlur events
      */
      const isFocused = this.state.focus || this.state.focusVisible;
      const isBecomeDisabled = !prevProps.disabled && this.props.disabled;
      if (isFocused && isBecomeDisabled) {
        this.onBlur({});
      }
    }

    focus = () => {
      if (this.wrappedComponentRef && this.wrappedComponentRef.focus) {
        this.wrappedComponentRef.focus();
      }
    };

    markAsFocused = () => {
      this.setState({ focus: true, focusVisible: inputMethod.isKeyboard() });
      inputMethod.subscribe(this, () => {
        if (inputMethod.isKeyboard()) {
          this.setState({ focusVisible: true });
        }
      });
    };

    markAsBlurred = () => {
      inputMethod.unsubscribe(this);
      this.setState({ focus: false, focusVisible: false });
    };

    onFocus = event => {
      const { onFocus } = this.props;
      onFocus
        ? onFocus(event, {
            blur: this.markAsBlurred,
            focus: this.markAsFocused,
          })
        : this.markAsFocused();
    };

    onBlur = event => {
      const { onBlur } = this.props;
      onBlur
        ? onBlur(event, { blur: this.markAsBlurred, focus: this.markAsFocused })
        : this.markAsBlurred();
    };

    render() {
      const reference = isStatelessComponent(Component)
        ? undefined
        : ref => (this.wrappedComponentRef = ref);

      return (
        <Component
          {...this.props}
          ref={reference}
          focusableOnFocus={this.onFocus}
          focusableOnBlur={this.onBlur}
          className={style(
            classes.root,
            {
              focus: this.state.focus,
              'focus-visible': this.state.focusVisible,
            },
            this.props.className,
          )}
        />
      );
    }
  }

  return isStatelessComponent(Component)
    ? FocusableHOC
    : hoistNonReactMethods(FocusableHOC, Component, {
        delegateTo: c => c.wrappedComponentRef,
        hoistStatics: true,
      });
};
