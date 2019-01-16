import * as React from 'react';
import { withFocusable } from '../../hocs/Focusable/FocusableHOC';
import style from './button-next.st.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** an element type to render as (string or function).  */
  as?: string | React.ComponentType<any>;
  /** URL of the page that link goes to */
  href?: string;
  /** accepts prefix icon */
  prefixIcon?: React.ReactElement<any>;
  /** accepts suffix icon  */
  suffixIcon?: React.ReactElement<any>;
  /** apply disabled styles */
  disabled?: boolean;
}

const _addAffix = (Affix, styleClass) =>
  Affix &&
  React.cloneElement(Affix, {
    className: style[styleClass],
  });

/**
 * ButtonNext
 */

const ButtonNextComponent: React.SFC<
  ButtonProps & { focusableOnFocus: () => void; focusableOnBlur: () => void }
> = props => {
  const {
    as: Component,
    suffixIcon,
    prefixIcon,
    children,
    disabled,
    focusableOnFocus,
    focusableOnBlur,
    href,
    ...rest
  } = props;
  const htmlTabIndex = disabled ? -1 : rest.tabIndex || 0;
  const htmlHref = disabled ? undefined : href;
  return (
    <Component
      {...rest}
      onFocus={focusableOnFocus}
      onBlur={focusableOnBlur}
      disabled={href ? undefined : disabled}
      href={htmlHref}
      tabIndex={htmlTabIndex}
      aria-disabled={disabled}
      {...style('root', { disabled }, rest)}
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
