import * as React from 'react';
import {bool, func, object, any, oneOf, string} from 'prop-types';
import style from './Button.st.css';
import {BaseProps} from '../../types/BaseProps';
import { withFocusable } from '../../hocs/Focusable/FocusableHOC';

export interface ButtonProps extends BaseProps, React.ButtonHTMLAttributes<any> {
  /* prop from withFocusable hoc */
  focusableOnFocus: () => void;
  /* prop from withFocusable hoc */
  focusableOnBlur: () => void;
  /** Type of the button - submit / button / reset */
  type?: 'submit' | 'button' | 'reset';
}

/**
 * Button
 */
class ButtonCore extends React.Component<ButtonProps> {
  static displayName = 'Button';
  static propTypes = {
    /** Wrapper class name */
    className: string,
    /** Type of the button - submit / button / reset */
    type: oneOf(['submit', 'button', 'reset']),
  }

  render() {
    const {focusableOnFocus, focusableOnBlur, ...other} = this.props;

    return (
      <button
        onFocus={focusableOnFocus}
        onBlur={focusableOnBlur}
        {...other}
        {...style('root', {disabled: other.disabled}, this.props)}
      />
    );
  }
}

export const Button = withFocusable(ButtonCore)

Button.displayName = 'Button';
Button.propTypes = {
  /** Wrapper class name */
  className: string,
  /** Type of the button - submit / button / reset */
  type: oneOf(['submit', 'button', 'reset']),
};
