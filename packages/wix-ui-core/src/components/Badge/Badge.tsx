import * as React from 'react';
import {object, any} from 'prop-types';
import {createHOC} from '../../createHOC';

export type BadgeClasses = {
  badge: string;
};

export interface BadgeProps {
  classes?: BadgeClasses;
  children?: React.ReactNode;
}

/**
 * Badge
 */
class Badge extends React.PureComponent<BadgeProps> {
  static displayName = 'Badge';

  static propTypes = {
    /** Classes object */
    classes: object.isRequired,
    /** Any node to be rendered (usually text node) */
    children: any
  };

  render() {
    const {classes, children} = this.props;

    return (
      <span className={classes.badge}>
        {children}
      </span>
    );
  }
}

export default createHOC(Badge);
