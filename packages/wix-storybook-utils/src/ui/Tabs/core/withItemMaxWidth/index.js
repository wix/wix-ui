import React from 'react';

import * as TabPropTypes from '../constants/tab-prop-types';
import { getWidth } from '../utils';

const withMaxWidth = WrappedComponent => {
  const getMaxWidth = (items, containerWidth) => {
    const COMPACT_SIDE_MARGIN = 18;
    const marginsBetweenItems = COMPACT_SIDE_MARGIN * 2 * (items.length - 1);
    return (containerWidth - marginsBetweenItems) / items.length;
  };

  class Wrapper extends React.Component {
    state = {
      itemMaxWidth: undefined,
    };

    initMaxWidth(itemsContainer) {
      const { type, items } = this.props;

      if (!itemsContainer || type !== 'compactSide') {
        return;
      }

      const itemMaxWidth = getMaxWidth(items, getWidth(itemsContainer));
      if (this.state.itemMaxWidth !== itemMaxWidth) {
        this.setState({ itemMaxWidth });
      }
    }

    render() {
      return (
        <div ref={el => this.initMaxWidth(el)} style={{ width: '100%' }}>
          <WrappedComponent
            {...this.props}
            itemMaxWidth={this.state.itemMaxWidth}
          />
        </div>
      );
    }
  }

  Wrapper.propTypes = {
    type: TabPropTypes.type,
    items: TabPropTypes.items.isRequired,
  };

  return Wrapper;
};

export default withMaxWidth;
