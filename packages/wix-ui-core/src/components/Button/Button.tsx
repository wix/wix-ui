import * as React from 'react';
import {Prefix} from './components/Prefix';
import {Suffix} from './components/Suffix';
import {createHOC} from '../../createHOC';
import {ButtonClasses} from './styles';

export interface ButtonProps extends React.Props<HTMLDivElement> {
  type?: string;
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onMouseEnter?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onMouseLeave?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  disabled?: boolean;
  classes: ButtonClasses;
  children: React.ReactNode;
};

const Button: React.StatelessComponent<ButtonProps> = ({disabled, onClick, children, type, onMouseEnter, onMouseLeave, classes}) => (
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
