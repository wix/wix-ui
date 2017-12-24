import * as React from 'react';
import {bool, func, object, any} from 'prop-types';
import {createHOC} from '../../createHOC';

type ButtonLayoutClasses = {
  buttonLayout: string
};

interface ButtonLayoutProps {
  disabled?: boolean;
  onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
  onMouseEnter?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
  onMouseLeave?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
  classes: ButtonLayoutClasses;
  children: React.ReactNode;
}

/**
 * ButtonLayout
 */
class ButtonLayout extends React.PureComponent<ButtonLayoutProps> {
  static displayName = 'ButtonLayout';

  static propTypes = {
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

  internalOnClick(onClick: Function) {
    if (!this.props.disabled && onClick) {
      onClick();
    }
  }

  render() {
    const {onClick, children, classes, onMouseEnter, onMouseLeave, disabled} = this.props;

    return (
      <div
        onClick={() => this.internalOnClick(onClick)}
        className={classes.buttonLayout}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-disabled={disabled}
        >
        {children}
      </div>
    );
  }
}

export default createHOC(ButtonLayout);
