import * as React from "react";
import { string, node, bool, oneOf } from "prop-types";
import { BaseProps } from "../../types/BaseProps";
import style from "./button-next.st.css";

export interface ButtonProps
  extends BaseProps,
    React.ButtonHTMLAttributes<any> {
  prefixIcon?: React.ReactElement<any>;
  suffixIcon?: React.ReactElement<any>;
  dataHook?: string;
  error?: boolean;
}
/**
 * ButtonNext
 */
export class ButtonNext extends React.Component<ButtonProps> {
  static displayName = "ButtonNext";

  static defaultProps = {
    disabled: false,
    error: false,
    type: "button"
  };

  static propTypes = {
    className: string,
    dataHook: string,
    disabled: bool,
    error: bool,
    prefixIcon: node,
    suffixIcon: node,
    type: oneOf(["submit", "button", "reset"])
  };

  addPrefix = prefixIcon =>
    prefixIcon &&
    React.cloneElement(prefixIcon, {
      className: style.prefix
    });

  addSuffix = suffixIcon =>
    suffixIcon &&
    React.cloneElement(suffixIcon, {
      className: style.suffix
    });

  render() {
    const {
      suffixIcon,
      prefixIcon,
      dataHook,
      children,
      onClick,
      disabled,
      error,
      ...rest
    } = this.props;
    return (
      <button
        {...rest}
        data-hook={dataHook}
        onClick={disabled ? null : onClick}
        {...style("root", { disabled, error }, this.props)}
      >
        {this.addPrefix(prefixIcon)}
        <span className={style.content}>{children}</span>
        {this.addSuffix(suffixIcon)}
      </button>
    );
  }
}
