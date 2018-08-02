import * as React from 'react';
import {bool, func, object, any, oneOf, string} from 'prop-types';
import style from './Button.st.css';
import {BaseProps} from '../../types/BaseProps';

export interface ButtonProps extends BaseProps, React.ButtonHTMLAttributes<any> {
  /** Type of the button - submit / button / reset */
  type?: 'submit' | 'button' | 'reset';
}

/**
 * Button
 */
export const Button: React.SFC<ButtonProps> = props => {
  const {disabled} = props;

  return (
    <button {...props} {...style('root', {disabled}, props)}/>
  );
};

Button.displayName = 'Button';
Button.propTypes = {
  /** Wrapper class name */
  className: string,
  /** Type of the button - submit / button / reset */
  type: oneOf(['submit', 'button', 'reset']),
};
