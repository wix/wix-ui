import * as React from 'react';
import style from './Divider.st.css';
import {bool, any} from 'prop-types';

export interface DividerProps {
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
      data-hook="divider"
      >
        {children}
    </div>);
};

Divider.displayName = 'Divider';
Divider.propTypes = {
  /** Is the direction of the divider vertical */
  vertical: bool,
  /** Optional custom divider */
  children: any
};
