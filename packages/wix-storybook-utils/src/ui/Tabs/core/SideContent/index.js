import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../Tabs.scss';

const SideContent = ({ content }) =>
  content ? <div className={styles.sideContent}>{content}</div> : null;

SideContent.propTypes = {
  content: PropTypes.node,
};

export default SideContent;
