import React from 'react';

import Tooltip from '../../../Tooltip';
import * as TabPropTypes from '../constants/tab-prop-types';
import { getWidth } from '../utils';

const withTooltip = WrappedComponent => {
  const VERTICAL_PADDING = 18;

  class Wrapper extends React.Component {
    state = {
      hasTooltip: false,
    };

    initHasTooltip(content) {
      const { type } = this.props;

      if (!content || type !== 'compactSide') {
        return;
      }

      const hasTooltip = getWidth(content) > getWidth(content.parentElement);
      if (this.state.hasTooltip !== hasTooltip) {
        this.setState({ hasTooltip });
      }
    }

    withTooltipProperties(component, key) {
      const tooltipProperties = [
        'onMouseEnter',
        'onMouseLeave',
        'onFocus',
        'onBlur',
      ];
      return React.cloneElement(component, { [key]: tooltipProperties });
    }

    withTooltip(component) {
      const { id, title } = this.props.item;
      return (
        <Tooltip key={id} content={title} moveBy={{ y: VERTICAL_PADDING }}>
          {this.withTooltipProperties(component, 'dynamicProperties')}
        </Tooltip>
      );
    }

    renderWrappedComponent() {
      return (
        <WrappedComponent
          {...this.props}
          initHasTooltip={el => this.initHasTooltip(el)}
        />
      );
    }

    render() {
      const component = this.renderWrappedComponent();
      return this.state.hasTooltip ? this.withTooltip(component) : component;
    }
  }

  Wrapper.propTypes = {
    type: TabPropTypes.type,
    item: TabPropTypes.item.isRequired,
  };

  return Wrapper;
};

export default withTooltip;
