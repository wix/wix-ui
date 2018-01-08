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
const Badge: React.SFC<BadgeProps> = ({classes, children}) => (
  <span className={classes.badge}>
    {children}
  </span>
);

Badge.displayName = 'Badge';
Badge.propTypes = {
  /** Classes object */
  classes: object.isRequired,
  /** Any node to be rendered (usually text node) */
  children: any
};

export default createHOC(Badge);
