import React from 'react';

import * as TabPropTypes from '../constants/tab-prop-types';
import { getWidth } from '../utils';

interface Item {
  id?: string | number;
  title?: React.ReactNode;
  dataHook?: string;
}
export interface WrapperProps {
  type?: '' | 'compact' | 'compactSide' | 'uniformSide' | 'uniformFull';
  items: Item[];
}
interface WrapperState {
  itemMaxWidth?: number;
}

type WrapperComponent = React.ComponentType<WrapperProps>;

const withMaxWidth = (
  WrappedComponent: React.ComponentType<any>,
): WrapperComponent => {
  const getMaxWidth = (items, containerWidth) => {
    const COMPACT_SIDE_MARGIN = 18;
    const marginsBetweenItems = COMPACT_SIDE_MARGIN * 2 * (items.length - 1);
    return (containerWidth - marginsBetweenItems) / items.length;
  };

  class Wrapper extends React.Component<WrapperProps, WrapperState> {
    static propTypes = {
      type: TabPropTypes.type,
      items: TabPropTypes.items.isRequired,
    };

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

  return Wrapper as WrapperComponent;
};

export default withMaxWidth;
