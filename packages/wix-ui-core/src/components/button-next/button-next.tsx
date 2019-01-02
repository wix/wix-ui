import * as React from 'react';
import { withFocusable } from '../../hocs/Focusable/FocusableHOC';
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

const _addAffix = (Affix, classname) =>
  Affix &&
  React.cloneElement(Affix, {
    className: style[classname],
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
  const htmlRef = disabled ? undefined : restProps.href;
  const ariaDisabled = disabled ? true : restProps['aria-disabled'];
  return (
    <Component
      {...rest}
      onFocus={focusableOnFocus}
      onBlur={focusableOnBlur}
      disabled={disabled}
      type={htmlType}
      href={htmlRef}
      tabIndex={htmlTabIndex}
      aria-disabled={ariaDisabled}
      {...style('root', { disabled }, restProps)}
    >
      {_addAffix(prefixIcon, 'prefix')}
      <span className={style.content}>{children}</span>
      {_addAffix(suffixIcon, 'suffix')}
    </Component>
  );
};

ButtonNextComponent.displayName = 'ButtonNext';
ButtonNextComponent.defaultProps = { as: 'button' };

export const ButtonNext = withFocusable(ButtonNextComponent);
