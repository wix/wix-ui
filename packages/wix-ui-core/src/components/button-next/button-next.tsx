import * as React from 'react';
import { withFocusable } from '../../hocs/Focusable/FocusableHOC';
import style from './button-next.st.css';

export interface BaseButtonProps {
  as?: any;
  /** accepts prefix icon */
  prefixIcon?: React.ReactElement<any>;
  /** accepts suffix icon  */
  suffixIcon?: React.ReactElement<any>;
  /** callback need to be applied for onFocus event */
  focusableOnFocus?: React.FocusEventHandler<HTMLButtonElement> &
    React.FocusEventHandler<HTMLAnchorElement>;
  /** callback need to be applied for onBlur event */
  focusableOnBlur?: React.FocusEventHandler<HTMLButtonElement> &
    React.FocusEventHandler<HTMLAnchorElement>;
}

export type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const _addAffix = (Affix, classname) =>
  Affix &&
  React.cloneElement(Affix, {
    className: style[classname]
  });

/**
 * ButtonNext
 */

const ButtonNextComponent: React.SFC<ButtonProps> = props => {
  const {
    as,
    suffixIcon,
    prefixIcon,
    children,
    focusableOnFocus,
    focusableOnBlur,
    ...rest
  } = props;

  const renderComponent = restProps => {
    const Component = as;
    return (
      <Component
        {...restProps}
        onFocus={focusableOnFocus}
        onBlur={focusableOnBlur}
        {...style('root', {}, restProps)}
      >
        {_addAffix(prefixIcon, 'prefix')}
        <span className={style.content}>{children}</span>
        {_addAffix(suffixIcon, 'suffix')}
      </Component>
    );
  };

  // Handle rendering anchor instead of button
  const anchorRestProps = rest as AnchorButtonProps;
  if (anchorRestProps.href || as === 'a') {
    return renderComponent(anchorRestProps);
  }

  // Handle custom component render
  const customHTMLTagRestProps = rest as any;
  if (as !== 'a' || as !== 'button') {
    renderComponent(customHTMLTagRestProps);
  }

  // Handle regular button rendering
  return renderComponent(rest as NativeButtonProps);
};

ButtonNextComponent.displayName = 'ButtonNext';
ButtonNextComponent.defaultProps = { type: 'button', as: 'button' };

export const ButtonNext = withFocusable(ButtonNextComponent);
