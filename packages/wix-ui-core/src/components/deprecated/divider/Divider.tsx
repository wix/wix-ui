import * as React from 'react';
import { style, classes } from './Divider.st.css';

export interface DividerProps {
  className?: string;
  vertical?: boolean;
  children?: any;
  /** hook for testing purposes */
  'data-hook'?: string;
}

/**
 * Divider
 */
export const Divider: React.FunctionComponent<DividerProps> = (
  props: DividerProps,
) => {
  const { children, vertical } = props;
  const customDivider = !!children;

  return (
    <div
      className={style(
        classes.root,
        { vertical: vertical && !customDivider, customDivider },
        props.className,
      )}
      data-hook={props['data-hook']}
    >
      {children}
    </div>
  );
};

Divider.displayName = 'Divider';
