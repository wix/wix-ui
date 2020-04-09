import * as React from 'react';
import { classes } from './Badge.st.css';

export interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Badge
 */
export const Badge: React.FunctionComponent<BadgeProps> = props => (
  <span className={classes.root}>{props.children}</span>
);

Badge.displayName = 'Badge';
