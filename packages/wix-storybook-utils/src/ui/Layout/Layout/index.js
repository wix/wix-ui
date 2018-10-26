import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Layout = ({children, gap, cols, dataHook, className}) => (
  <div
    style={{
      gridGap: gap,
      gridTemplateColumns: cols ? `repeat(${cols}, 1fr)` : undefined
    }}
    className={`${styles.root} ${className}`}
    children={children}
    data-hook={dataHook}
  />
);

Layout.displayName = 'Layout';

Layout.propTypes = {
  /** one or more Cell components. Other nodes are accepted although not recommended */
  children: PropTypes.node,

  /** distance between cells both vertically and horizontally */
  gap: PropTypes.string,

  /** set custom amount of columns to be rendered. Default is 12 which means at `<Cell span={12}/>` occupies all columns, in other words, full width */
  cols: PropTypes.number,

  dataHook: PropTypes.string,
  className: PropTypes.string
};

Layout.defaultProps = {
  gap: '30px'
};

export default Layout;
