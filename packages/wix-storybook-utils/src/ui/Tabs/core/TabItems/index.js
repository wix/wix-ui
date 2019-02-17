import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as TabPropTypes from '../constants/tab-prop-types';
import TabItem from '../TabItem';
import withItemMaxWidth from '../withItemMaxWidth';
import styles from '../../styles.scss';

class TabItems extends React.Component {
  renderItem(item) {
    const { activeId, type, width, onClick, itemMaxWidth } = this.props;
    return (
      <TabItem
        key={item.id}
        dataHook={item.dataHook}
        item={item}
        itemMaxWidth={itemMaxWidth}
        isActive={activeId === item.id}
        type={type}
        width={width}
        onItemClick={onClick}
      />
    );
  }

  render() {
    const { items, type, dataHook } = this.props;
    const className = classNames(styles.itemsContainer, styles[type]);

    return (
      <ul
        className={className}
        data-hook={dataHook}
        style={{ minWidth: this.props.minWidth }}
      >
        {items.map(item => this.renderItem(item))}
      </ul>
    );
  }
}

TabItems.propTypes = {
  activeId: TabPropTypes.activeId,
  dataHook: PropTypes.string,
  itemMaxWidth: PropTypes.number,
  items: TabPropTypes.items.isRequired,
  minWidth: TabPropTypes.width,
  type: TabPropTypes.type,
  width: TabPropTypes.width,
  onClick: TabPropTypes.onClick,
};

export default withItemMaxWidth(TabItems);
