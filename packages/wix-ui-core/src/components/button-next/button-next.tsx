import * as React from 'react';
import * as classNames from 'classnames';

import { style, classes } from './button-next.st.css';
import { isStatelessComponent } from '../../utils';

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
    className: classNames(classes[styleClass], Affix.props.className),
  });

/**
 * ButtonNext
 */
class ButtonNextComponent extends React.Component<ButtonProps> {
  static defaultProps = { as: 'button', type: 'button' };
  static displayName = 'ButtonNext';
  public innerComponentRef: React.RefObject<HTMLElement | React.ComponentType>;

  focus() {
    if (this.innerComponentRef && (this.innerComponentRef as any).focus) {
      (this.innerComponentRef as any).focus();
    }
  }

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
    const reference =
      isStatelessComponent(Component) && typeof Component !== 'string'
        ? undefined
        : ref => (this.innerComponentRef = ref);

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
        className={style(classes.root, { disabled }, this.props.className)}
      >
        {_addAffix(prefixIcon, 'prefix')}
        <span className={classes.content}>{children}</span>
        {_addAffix(suffixIcon, 'suffix')}
      </Component>
    );
  }
}

export const ButtonNext = ButtonNextComponent;
