import * as React from 'react';
import {bool, func, object, any} from 'prop-types';
import {createHOC} from '../../createHOC';
import * as classNames from 'classnames';

type ButtonLayoutClasses = {
  buttonLayout: string;
  disabled: string;
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

  render() {
    const {onClick, children, classes, onMouseEnter, onMouseLeave, disabled} = this.props;

    return (
      <div
        onClick={(e) => !this.props.disabled && onClick && onClick(e)}
        className={classNames(classes.buttonLayout, {[classes.disabled]: disabled})}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
        {children}
      </div>
    );
  }
}

export default createHOC(ButtonLayout);
