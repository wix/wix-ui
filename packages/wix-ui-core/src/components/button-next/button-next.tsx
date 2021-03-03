import * as React from 'react';
import * as classNames from 'classnames';

import { st, classes } from './button-next.st.css';
import { dataHooks } from './constants';
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
  /** class name to be added to the content span */
  contentClassName?: string;
  /** React ref to be attached to the content span */
  contentRef?: React.RefObject<HTMLSpanElement>;

  focusableOnFocus?(): void;
  focusableOnBlur?(): void;
}

const _addAffix = (Affix, styleClass, dataHook) =>
  Affix &&
  React.cloneElement(Affix, {
    className: classNames(classes[styleClass], Affix.props.className),
    dataHook,
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
      contentClassName,
      contentRef,
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
        className={st(classes.root, { disabled }, this.props.className)}
      >
        {_addAffix(prefixIcon, 'prefix', dataHooks.prefixIcon)}
        <span
          className={st(classes.content, contentClassName)}
          ref={contentRef}
        >
          {children}
        </span>
        {_addAffix(suffixIcon, 'suffix', dataHooks.suffixIcon)}
      </Component>
    );
  }
}

export const ButtonNext = ButtonNextComponent;
