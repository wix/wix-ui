import * as React from 'react';
import style from './Divider.st.css';
import {bool, any, string} from 'prop-types';

export interface DividerProps {
  className?: string;
  vertical?: boolean;
  children?: any;
}

/**
 * Divider
 */
export const Divider: React.SFC<DividerProps> = (props: DividerProps) => {
  const {children, vertical} = props;
  const customDivider = !!children;

  return (
    <div
      {...style('root', {vertical: vertical && !customDivider, customDivider}, props)}
    >
      {children}
    </div>
  );
};

Divider.displayName = 'Divider';
Divider.propTypes = {
  /** Class name */
  className: string,
  /** Is the direction of the divider vertical */
  vertical: bool,
  /** Optional custom divider */
  children: any
};
