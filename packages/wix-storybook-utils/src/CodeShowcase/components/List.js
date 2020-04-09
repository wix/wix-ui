import React from 'react';
import classnames from 'classnames';
import { node, bool } from 'prop-types';

import styles from '../CodeShowcase.scss';

const spacing = {
  marginRight: '8px',
  marginBottom: '8px',
  marginTop: '8px',
  lineHeight: '0',
  display: 'flex',
};

const List = ({ children, inverted }) => (
  <div
    className={classnames(styles.demoItems, { [styles.inverted]: inverted })}
  >
    {Array.isArray(children)
      ? children.map((child, index) => (
          <div key={index} style={spacing}>
            {child}
          </div>
        ))
      : children}
  </div>
);

List.propTypes = {
  children: node,
  inverted: bool,
};

List.defaultProps = {
  inverted: false,
};

export default List;
