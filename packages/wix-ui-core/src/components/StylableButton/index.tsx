import * as React from 'react';
import {bool, func, object, any, oneOf} from 'prop-types';
import style from './StylableButton.st.css';

export type StylableButtonStyles = {
  root?: object;
};

export interface StylableButtonProps {
  type?: string;
  disabled?: boolean;
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onMouseEnter?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onMouseLeave?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  // styles?: StylableButtonStyles;
  children?: React.ReactNode;
}

/**
 * Stylable Button
 */
export const StylableButton: React.SFC<StylableButtonProps> = ({type, disabled, onClick, onMouseEnter, onMouseLeave, children}) => (
  <button {...style('root', {disabled}, this.props)}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    disabled={disabled}
    type={type}
    >
    {children}
  </button>
);

StylableButton.displayName = 'Button';
StylableButton.propTypes = {
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

