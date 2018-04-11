import * as React from 'react';
import {bool, func, object, any, oneOf, string} from 'prop-types';
import style from './Button.st.css';

export interface ButtonProps {
  className?: string;
  type?: string;
  disabled?: boolean;
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onMouseEnter?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onMouseLeave?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  children?: React.ReactNode;
}

/**
 * Button
 */
export const Button: React.SFC<ButtonProps> = props => {
  const {type, disabled, onClick, onMouseEnter, onMouseLeave, children} = props;

  return (
    <button {...style('root', {disabled}, props)}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            disabled={disabled}
            type={type}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
Button.propTypes = {
  /** Wrapper class name */
  className: string,
  /** Type of the button - submit / button / reset */
  type: oneOf(['submit', 'button', 'reset']),
  /** Makes the button disabled */
  disabled: bool,
  /** Standard button onClick callback */
  onClick: func,
  /** Standard button onMouseEnter callback */
  onMouseEnter: func,
  /** Standard button onMouseLeave callback */
  onMouseLeave: func,
  /** Any node to be rendered (usually text node) */
  children: any
};
