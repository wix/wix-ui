import * as React from 'react';
import { style, classes } from './Divider.st.css';

export interface DividerProps {
  className?: string;
  vertical?: boolean;
  children?: any;
  dataHook?: string;
}

/**
 * Divider
 */
export const Divider: React.FunctionComponent<DividerProps> = (
  props: DividerProps,
) => {
  const { children, vertical, dataHook } = props;
  const customDivider = !!children;

  return (
    <div
      className={style(
        classes.root,
        { vertical: vertical && !customDivider, customDivider },
        props.className,
      )}
      data-hook={dataHook}
    >
      {children}
    </div>
  );
};

Divider.displayName = 'Divider';
