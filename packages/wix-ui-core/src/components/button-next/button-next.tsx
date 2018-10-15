import * as React from "react";
import { string, node, oneOf } from "prop-types";
import { BaseProps } from "../../types/BaseProps";
import style from "./button-next.st.css";

export interface ButtonProps
  extends BaseProps,
    React.ButtonHTMLAttributes<any> {
  /** accepts prefix icon */
  prefixIcon?: React.ReactElement<any>;
  /** accepts suffix icon  */
  suffixIcon?: React.ReactElement<any>;
}
/**
 * ButtonNext
 */
export class ButtonNext extends React.Component<ButtonProps> {
  static displayName = "ButtonNext";

  static defaultProps = {
    type: "button"
  };

  static propTypes = {
    className: string,
    prefixIcon: node,
    suffixIcon: node,
    type: oneOf(["submit", "button", "reset"])
  };

  _addPrefix = prefixIcon =>
    prefixIcon &&
    React.cloneElement(prefixIcon, {
      className: style.prefix
    });

  _addSuffix = suffixIcon =>
    suffixIcon &&
    React.cloneElement(suffixIcon, {
      className: style.suffix
    });

  render() {
    const { suffixIcon, prefixIcon, children, onClick, ...rest } = this.props;
    return (
      <button {...rest} onClick={onClick} {...style("root", {}, this.props)}>
        {this._addPrefix(prefixIcon)}
        <span className={style.content}>{children}</span>
        {this._addSuffix(suffixIcon)}
      </button>
    );
  }
}
