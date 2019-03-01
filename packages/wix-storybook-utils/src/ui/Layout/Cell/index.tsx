import React from 'react';
import classname from 'classnames';

import styles from './styles.scss';

interface Props {
  /** any node to be rendered inside */
  children?: React.ReactNode;

  /** how many columns should this cell occupy. Can be any number from 1 to 12 inclusive */
  span?: number;

  /** whether to align children vertically to the middle */
  vertical?: boolean;

  className?: string;
}

const Cell: React.FunctionComponent<Props> = ({
  span,
  children,
  className,
  vertical,
}) => (
  <div
    style={{
      gridColumn: `span ${span}`,
    }}
    className={classname(styles.root, className, {
      [styles.vertical]: vertical,
    })}
    children={children}
  />
);

Cell.displayName = 'Cell';

Cell.defaultProps = {
  span: 12,
};

export default Cell;
