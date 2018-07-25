import * as React from 'react';
import hoistNonReactMethods from 'hoist-non-react-methods';
import {wrapDisplayName, getDisplayName, isStatelessComponent} from '../utils';

/**
 * Use this method to spread the focusable focus states onto the a component's root element.
 * @param {object} props
 */
export function focusableStates(props) {
  if (!props) {
    throw new Error('FocusableHOC.focusableStates(props): props must be defined');
  }
  return {
    'data-focus': props.focusableIsFocused,
    'data-focus-visible': props.focusableIsFocusVisible
  };
}

/**
 * Singleton for managing current input method (keyboard or mouse).
 */
const inputMethod = new class {
  // Default is keyboard in case an element is focused programmatically.
  method = 'keyboard';
  subscribers = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', () => this.setMethod('mouse'));
      window.addEventListener('keydown', () => this.setMethod('keyboard'));
      // We need to listen on keyUp, in case a TAB is made from the browser's address-bar,
      // so the keyDown is not fired, only the keyUp.
      window.addEventListener('keyup', () => this.setMethod('keyboard'));
    }
  }

  /**
   * Subscribe to inputMethod change events
   * @param {*} target used as a key to the subscribers map
   * @param {*} callback optional to be called when the input method changes
   */
  subscribe = (target, callback) => this.subscribers.set(target, callback);

  /**
   * Unsubscribe to inputMethod change events
   * @param {*} target used as a key to the subscribers map
   */
  unsubscribe = target => this.subscribers.delete(target)

  /**
   * Is the current input method `keyboard`. if `false` is means it is `mouse`
   */
  isKeyboard = () => this.method === 'keyboard'

  setMethod(method) {
    if (method !== this.method) {
      this.method = method;
      this.subscribers.forEach(f => f());
    }
  }
}();

/*
 * TODO: Consider adding 'disabled' state to this HOC, since:
 * - When component is focused and then it becomes disabled, then the focus needs to be blured.
 *
 * TODO: Consider using [Recompose](https://github.com/acdlite/recompose/tree/master/src/packages/recompose) to do:
 *  - the static hoisting
 *  - set displayName
 */
export const withFocusable = Component => {

  if (isStatelessComponent(Component)) {
    throw new Error(`FocusableHOC does not support stateless components. ${getDisplayName(Component)} is stateless.`);
  }

  interface IFocusableHOCState {
    focus: boolean;
    focusVisible: boolean;
  }

  class FocusableHOC extends React.PureComponent<any, IFocusableHOCState> {
    static displayName = wrapDisplayName(Component, 'WithFocusable');
    static propTypes = Component.propTypes;
    static defaultProps = Component.defaultProps;

    wrappedComponentRef = null;
    focusedByMouse = false;

    state = {
      focus: false,
      focusVisible: false
    };

    componentWillUnmount() {
      inputMethod.unsubscribe(this);
    }

    onFocus = () => {
      this.setState({focus: true, focusVisible: inputMethod.isKeyboard()});
      inputMethod.subscribe(this, () => {
        if (inputMethod.isKeyboard()) {
          this.setState({focusVisible: true});
        }
      });
    };

    onBlur = () => {
      inputMethod.unsubscribe(this);
      this.setState({focus: false, focusVisible: false});
    };

    render() {
      return (
        <Component
          ref={ref => this.wrappedComponentRef = ref}
          {...this.props}
          focusableOnFocus={this.onFocus}
          focusableOnBlur={this.onBlur}
          focusableIsFocused={this.state.focus || null}
          focusableIsFocusVisible={this.state.focusVisible || null}
        />
      );
    }
  }

  return hoistNonReactMethods(
    FocusableHOC,
    Component,
    {delegateTo: c => c.wrappedComponentRef, hoistStatics: true}
  );
};
