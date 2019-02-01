import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TabItems from './core/TabItems';
import styles from './styles.scss';

const Tabs = ({ className, ...rest }) => (
  <div className={classNames(styles.container, className)}>
    <TabItems {...rest} />
  </div>
);

Tabs.propTypes = {
  activeId: PropTypes.string,
  items: PropTypes.array,
  onClick: PropTypes.func,
};

export default Tabs;
