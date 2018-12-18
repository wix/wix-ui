import * as React from 'react';
import { withFocusable } from '../../hocs/Focusable/FocusableHOC';
import style from './button-next.st.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** accepts any custom component or html tag */
  as?: any;
  /** accepts prefix icon */
  prefixIcon?: React.ReactElement<any>;
  /** accepts suffix icon  */
  suffixIcon?: React.ReactElement<any>;
  /** callback need to be applied for onFocus event */
  focusableOnFocus?: React.FocusEventHandler<HTMLButtonElement>;
  /** callback need to be applied for onBlur event */
  focusableOnBlur?: React.FocusEventHandler<HTMLButtonElement>;
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
    as,
    suffixIcon,
    prefixIcon,
    children,
    focusableOnFocus,
    focusableOnBlur,
    ...rest
  } = props;
  const Component = as;
  return (
    <Component
      {...rest}
      onFocus={focusableOnFocus}
      onBlur={focusableOnBlur}
      {...style('root', {}, rest)}
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
