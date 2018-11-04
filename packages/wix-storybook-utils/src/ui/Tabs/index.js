import React from 'react';
import PropTypes from 'prop-types';

import TabItems from './core/TabItems';
import styles from './styles.scss';

const Tabs = props => (
  <div className={styles.container}>
    <TabItems {...props} />
  </div>
);

Tabs.propTypes = {
  activeId: PropTypes.string,
  items: PropTypes.array,
  onClick: PropTypes.func,
};

export default Tabs;
