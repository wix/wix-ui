import * as React from 'react';
import {Prefix} from './components/Prefix';
import {Suffix} from './components/Suffix';
import {createHOC} from '../../createHOC';

//TODO - maybe this can be a generic type?
type ButtonClasses = {
  button: string
};

export interface ButtonProps {
  type?: string;
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onMouseEnter?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onMouseLeave?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  disabled?: boolean;
  classes: ButtonClasses;
  children: React.ReactNode;
}

type ButtonComponent = React.StatelessComponent<ButtonProps> & {
  Prefix?: React.StatelessComponent
  Suffix?: React.StatelessComponent
};

const Button: ButtonComponent = ({disabled, onClick, children, type, onMouseEnter, onMouseLeave, classes}) => (
  <button
    className={classes.button}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    disabled={disabled}
    type={type}
    >
    {children}
  </button>
);

Button.Prefix = Prefix;
Button.Suffix = Suffix;
Button.displayName = 'Button';

export default createHOC(Button);
