import * as React from 'react';
import { style, classes } from './Button.st.css';
import { BaseProps } from '../../../types/BaseProps';

export interface ButtonProps
  extends BaseProps,
    React.ButtonHTMLAttributes<any> {
  /** Type of the button - submit / button / reset */
  type?: 'submit' | 'button' | 'reset';
}

/**
 * Button
 */
export const Button: React.FunctionComponent<ButtonProps> = props => {
  const { disabled } = props;

  return (
    <button
      {...props}
      className={style(classes.root, { disabled }, props.className)}
    />
  );
};

Button.displayName = 'Button';
