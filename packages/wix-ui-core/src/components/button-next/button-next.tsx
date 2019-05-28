import * as React from 'react';
import * as classNames from 'classnames';

import style from './button-next.st.css';
import {canPassRef} from '../../utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** an element type to render as (string or function).  */
  as?: string | React.ComponentType<any>;
  /** URL of the page that link goes to */
  href?: string;
  /** accepts prefix icon */
  prefixIcon?: React.ReactElement;
  /** accepts suffix icon  */
  suffixIcon?: React.ReactElement;
  /** apply disabled styles */
  disabled?: boolean;

  focusableOnFocus?(): void;
  focusableOnBlur?(): void;
}

const _addAffix = (Affix, styleClass) =>
  Affix &&
  React.cloneElement(Affix, {
    className: classNames(style[styleClass], Affix.props.className),
  });

/**
 * ButtonNext
 */
class ButtonNextComponent extends React.Component<ButtonProps> {
  static defaultProps = { as: 'button', type: 'button' };
  static displayName = 'ButtonNext';
  public innerComponentRef: React.RefObject<HTMLButtonElement | ButtonProps['as']>;

  render() {
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
    } = this.props;
    const htmlTabIndex = disabled ? -1 : rest.tabIndex || 0;
    const htmlHref = disabled ? undefined : href;
    const reference = canPassRef(Component) ? ref => (this.innerComponentRef = ref) : undefined;

    return (
      <Component
        {...rest}
        onFocus={focusableOnFocus}
        onBlur={focusableOnBlur}
        disabled={href ? undefined : disabled}
        href={htmlHref}
        ref={reference}
        tabIndex={htmlTabIndex}
        aria-disabled={disabled}
        {...style('root', { disabled }, rest)}
      >
        {_addAffix(prefixIcon, 'prefix')}
        <span className={style.content}>{children}</span>
        {_addAffix(suffixIcon, 'suffix')}
      </Component>
    );
  }
}

export const ButtonNext = ButtonNextComponent;
