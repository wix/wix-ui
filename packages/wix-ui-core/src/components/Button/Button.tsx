import * as React from 'react';
import {bool, string, func, object, any} from 'prop-types';
import {createHOC} from '../../createHOC';

type ButtonClasses = {
  button: string
};

interface ButtonProps {
  type?: string;
  disabled?: boolean;
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onMouseEnter?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onMouseLeave?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  classes: ButtonClasses;
  children: React.ReactNode;
}

/**
 * Button
 */
class Button extends React.PureComponent<ButtonProps> {
  static displayName = 'Button';

  static propTypes = {
    /** Type of the button - submit / button / reset */
    type: string,
    /** Makes the button disabled */
    disabled: bool,
    /** Standard button onClick callback */
    onClick: func,
    /** Standard button onMouseEnter callback */
    onMouseEnter: func,
    /** Standard button onMouseLeave callback */
    onMouseLeave: func,
    /** Classes object */
    classes: object.isRequired,
    /** Any node to be rendered (usually text node) */
    children: any
  };

  render() {
    const {type, disabled, onClick, onMouseEnter, onMouseLeave, children, classes} = this.props;

    return (
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
  }
}

export default createHOC(Button);
