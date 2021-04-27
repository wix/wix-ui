import * as React from 'react';
import { st, classes } from './Button.st.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<any> {
  /** Type of the button - submit / button / reset */
  type?: 'submit' | 'button' | 'reset';
}

/**
 * Button
 */
export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { disabled } = props;

  return (
    <button
      {...props}
      className={st(classes.root, { disabled }, props.className)}
    />
  );
};

Button.displayName = 'Button';
