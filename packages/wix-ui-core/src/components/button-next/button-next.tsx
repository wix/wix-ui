import * as React from 'react';
import { withFocusable } from '../../hocs/Focusable/FocusableHOC';
import style from './button-next.st.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<any> {
  /** accepts prefix icon */
  prefixIcon?: React.ReactElement<any>;
  /** accepts suffix icon  */
  suffixIcon?: React.ReactElement<any>;
  /** callback need to be applied for onFocus event */
  focusableOnFocus?: React.FocusEventHandler<HTMLButtonElement>,
  /** callback need to be applied for onBlur event */
  focusableOnBlur?: React.FocusEventHandler<HTMLButtonElement>,
}

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
    suffixIcon,
    prefixIcon,
    children,
    onClick,
    focusableOnFocus,
    focusableOnBlur,
    ...rest
  } = props;
  return (
    <button
      {...rest}
      onFocus={focusableOnFocus}
      onBlur={focusableOnBlur}
      onClick={onClick}
      {...style('root', {}, props)}
    >
      {_addAffix(prefixIcon, 'prefix')}
      <span className={style.content}>{children}</span>
      {_addAffix(suffixIcon, 'suffix')}
    </button>
  );
};

ButtonNextComponent.displayName = 'ButtonNext';
ButtonNextComponent.defaultProps = { type: 'button' };

export const ButtonNext = withFocusable(ButtonNextComponent);
