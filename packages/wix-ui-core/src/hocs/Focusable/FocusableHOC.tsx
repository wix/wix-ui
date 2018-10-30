import * as React from "react";
import * as hoistNonReactStatics from "hoist-non-react-statics";
import { getDisplayName } from "../utils";
import styles from "./Focusable.st.css";

type SubscribeCb = () => void;

/**
 * Singleton for managing current input method (keyboard or mouse).
 */
const inputMethod = new class {
  // Default is keyboard in case an element is focused programmatically.
  method: "mouse" | "keyboard" = "keyboard";
  subscribers: Map<any, SubscribeCb> = new Map();

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("mousedown", () => this.setMethod("mouse"));
      window.addEventListener("keydown", () => this.setMethod("keyboard"));
      // We need to listen on keyUp, in case a TAB is made from the browser's address-bar,
      // so the keyDown is not fired, only the keyUp.
      window.addEventListener("keyup", () => this.setMethod("keyboard"));
    }
  }

  subscribe = (target: any, callback: SubscribeCb) =>
    this.subscribers.set(target, callback);

  unsubscribe = (target: any) => this.subscribers.delete(target);

  /**
   * Is the current input method `keyboard`. if `false` is means it is `mouse`
   */
  isKeyboard = () => this.method === "keyboard";

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
  interface IFocusableHOCState {
    focus: boolean;
    focusVisible: boolean;
  }

  class FocusableHOC extends React.Component<any, IFocusableHOCState> {
    static displayName = getDisplayName(Component);
    static defaultProps = Component.defaultProps;

    focusedByMouse = false;

    state = {
      focus: false,
      focusVisible: false
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
        this.onBlur();
      }
    }

    onFocus = () => {
      this.setState({ focus: true, focusVisible: inputMethod.isKeyboard() });
      inputMethod.subscribe(this, () => {
        if (inputMethod.isKeyboard()) {
          this.setState({ focusVisible: true });
        }
      });
    };

    onBlur = () => {
      inputMethod.unsubscribe(this);
      this.setState({ focus: false, focusVisible: false });
    };

    render() {
      return (
        <Component
          {...this.props}
          focusableOnFocus={this.onFocus}
          focusableOnBlur={this.onBlur}
          {...styles(
            "root",
            {
              focus: this.state.focus,
              "focus-visible": this.state.focusVisible
            },
            this.props
          )}
        />
      );
    }
  }

  return hoistNonReactStatics(FocusableHOC, Component);
};
