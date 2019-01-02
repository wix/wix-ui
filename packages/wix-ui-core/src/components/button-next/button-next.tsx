import * as React from 'react';
import { withFocusable } from '../../hocs/Focusable/FocusableHOC';
import classnames from 'classnames';
import style from './button-next.st.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** an element type to render as (string or function).  */
  as?: any;
  /** accepts prefix icon */
  prefixIcon?: React.ReactElement<any>;
  /** accepts suffix icon  */
  suffixIcon?: React.ReactElement<any>;
  /** callback need to be applied for onFocus event */
  focusableOnFocus?: React.FocusEventHandler<HTMLButtonElement>;
  /** callback need to be applied for onBlur event */
  focusableOnBlur?: React.FocusEventHandler<HTMLButtonElement>;
  /** apply disabled styles */
  disabled?: boolean;
}

export type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps;

const _addAffix = (AffixComp, styleClass, className) =>
  AffixComp &&
  React.cloneElement(AffixComp, {
    className: classnames(style[styleClass], className),
  });

/**
 * ButtonNext
 */

const ButtonNextComponent: React.SFC<NativeButtonProps> = props => {
  const {
    as: Component,
    suffixIcon,
    prefixIcon,
    children,
    focusableOnFocus,
    focusableOnBlur,
    disabled,
    ...rest
  } = props;
  const isButton = Component === 'button';
  const restProps = isButton ? rest : (rest as any);
  const htmlType = isButton ? restProps.type || 'button' : restProps.type;
  const htmlTabIndex = disabled ? -1 : restProps.tabIndex || 0;
  const htmlHref = disabled ? undefined : restProps.href;
  return (
    <Component
      {...rest}
      onFocus={focusableOnFocus}
      onBlur={focusableOnBlur}
      disabled={disabled}
      type={htmlType}
      href={htmlHref}
      tabIndex={htmlTabIndex}
      aria-disabled={disabled}
      {...style('root', { disabled }, restProps)}
    >
      {_addAffix(prefixIcon, 'prefix', restProps.className)}
      <span className={style.content}>{children}</span>
      {_addAffix(suffixIcon, 'suffix', restProps.className)}
    </Component>
  );
};

ButtonNextComponent.displayName = 'ButtonNext';
ButtonNextComponent.defaultProps = { as: 'button' };

export const ButtonNext = withFocusable(ButtonNextComponent);
