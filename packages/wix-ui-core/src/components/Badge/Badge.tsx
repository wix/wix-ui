import * as React from 'react';
import {object, any} from 'prop-types';
import style from './Badge.st.css';

export interface BadgeProps {
  children?: React.ReactNode;
}

/**
 * Badge
 */
export const Badge: React.SFC<BadgeProps> = props => (
  <span {...style('root', {}, props)}>
    {props.children}
  </span>
);

Badge.displayName = 'Badge';
Badge.propTypes = {
  /** Any node to be rendered (usually text node) */
  children: any
};
