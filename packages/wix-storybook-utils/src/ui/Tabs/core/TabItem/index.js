import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash/pick';

import * as TabPropTypes from '../constants/tab-prop-types';
import styles from '../../styles.scss';

class TabItem extends React.Component {
  render() {
    const { item, onItemClick, isActive, dynamicProperties } = this.props;

    const containerProps = {
      key: item.id,
      onClick: () => onItemClick(item),
      className: classNames(styles.tab, { [styles.active]: isActive }),
      ...pick(this.props, dynamicProperties),
    };

    return <li {...containerProps}>{item.title}</li>;
  }
}

TabItem.propTypes = {
  itemMaxWidth: PropTypes.number,
  isActive: PropTypes.bool,
  item: TabPropTypes.item.isRequired,
  onItemClick: TabPropTypes.onClick,
  type: TabPropTypes.type,
  width: TabPropTypes.width,
  dynamicProperties: PropTypes.array,
};

export default TabItem;
