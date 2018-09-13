import * as React from "react";
import { string, node, bool, oneOf } from "prop-types";
import { BaseProps } from "../../types/BaseProps";
import style from "./button-next.st.css";

export interface ButtonProps
  extends BaseProps,
    React.ButtonHTMLAttributes<any> {
  prefixIcon?: React.ReactElement<any>;
  suffixIcon?: React.ReactElement<any>;
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
    disabled: bool,
    error: bool,
    prefixIcon: node,
    suffixIcon: node,
    type: oneOf(["submit", "button", "reset"])
  };

  addPrefix = prefixIcon =>
    prefixIcon &&
    React.cloneElement(prefixIcon, {
      className: style.prefix,
      "data-hook": "prefix"
    });

  addSuffix = suffixIcon =>
    suffixIcon &&
    React.cloneElement(suffixIcon, {
      className: style.suffix,
      "data-hook": "suffix"
    });

  render() {
    const {
      suffixIcon,
      prefixIcon,
      children,
      onClick,
      disabled,
      error,
      type,
      ...rest
    } = this.props;
    return (
      <button
        {...rest}
        type={type}
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
