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
    /** Makes the button layout disabled */
    disabled: bool,
    /** onClick callback */
    onClick: func,
    /** onMouseEnter callback */
    onMouseEnter: func,
    /** onMouseLeave callback */
    onMouseLeave: func,
    /** Classes object */
    classes: object.isRequired,
    /** Any node to be rendered (usually <a> or <Link> node) */
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
