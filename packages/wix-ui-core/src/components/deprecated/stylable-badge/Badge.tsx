import * as React from 'react';
import style from './Badge.st.css';

export interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
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
