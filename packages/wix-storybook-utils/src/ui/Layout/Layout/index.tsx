import * as React from 'react';

import styles from './styles.scss';

interface Props {
  /** one or more Cell components. Other nodes are accepted although not recommended */
  children?: React.ReactNode;

  /** distance between cells both vertically and horizontally */
  gap?: string;

  /** set custom amount of columns to be rendered. Default is 12 which means at `<Cell span={12}/>` occupies all columns, in other words, full width */
  cols?: number;

  dataHook?: string;

  className?: string;
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  gap,
  cols,
  dataHook,
  className,
}) => (
  <div
    style={{
      gridGap: gap,
      gridTemplateColumns: cols ? `repeat(${cols}, 1fr)` : undefined,
    }}
    className={`${styles.root} ${className}`}
    children={children}
    data-hook={dataHook}
  />
);

Layout.displayName = 'Layout';

Layout.defaultProps = {
  gap: '30px',
};

export default Layout;
