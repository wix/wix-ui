import * as React from "react";
import { string, node, bool } from "prop-types";
import style from "./button.st.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  prefixIcon?: React.ReactElement<any>;
  suffixIcon?: React.ReactElement<any>;
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  disabled?: boolean;
  error?: boolean;
}
/**
 * Button
 */
export class Button extends React.Component<ButtonProps> {
  static displayName = "Button";

  static defaultProps = {
    disabled: false,
    error: false
  };

  static propTypes = {
    className: string,
    disabled: bool,
    prefixIcon: node,
    suffixIcon: node,
    error: bool
  };

  addPrefix = () =>
    this.props.prefixIcon &&
    React.cloneElement(this.props.prefixIcon, { className: style.prefix });

  addSuffix = () =>
    this.props.suffixIcon &&
    React.cloneElement(this.props.suffixIcon, { className: style.suffix });

  render() {
    const { children, onClick, disabled, error, ...rest } = this.props;
    return (
      <button
        {...rest}
        onClick={disabled ? null : onClick}
        {...style("root", { error }, this.props)}
      >
        {this.addPrefix()}
        <span className={style.content}>{children}</span>
        {this.addSuffix()}
      </button>
    );
  }
}
