import * as React from 'react';
import { style, classes } from './Badge.st.css';

export interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
  /** hook for testing purposes */
  'data-hook'?: string;
}

/**
 * Badge
 */
export const Badge: React.FunctionComponent<BadgeProps> = props => (
  <span
    data-hook={props['data-hook']}
    className={style(classes.root, {}, props.className)}
  >
    {props.children}
  </span>
);

Badge.displayName = 'Badge';
