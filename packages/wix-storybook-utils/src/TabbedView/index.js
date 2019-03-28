import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '../ui/Tabs';
import * as queryString from 'query-string';
import { isE2E } from '../utils';

const createTab = id => ({ title: id, id, dataHook: id });

export default class TabbedView extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string),
    activeTabId: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  };

  static defaultProps = {
    showTabs: !isE2E,
  };

  constructor(props) {
    super(props);
    const activeTabFromQuery = queryString.parse(window.parent.location.search)
      .activeTab;
    this.state = {
      activeTabId: activeTabFromQuery || props.activeTabId || props.tabs[0],
    };
  }

  isActiveTab = index => {
    const testedTab = this.props.tabs[index];
    if (!testedTab) {
      return false;
    }
    return this.state.activeTabId.toLowerCase() === testedTab.toLowerCase();
  };

  getNormalizedTabName = () =>
    this.props.tabs.find((_, i) => this.isActiveTab(i));

  onTabClick = tab => {
    const originalQuery = queryString.parse(window.parent.location.search);
    originalQuery.activeTab = tab.id;
    window.parent.history.pushState(
      { id: tab.id },
      '',
      `?${queryString.stringify(originalQuery)}`,
    );
    this.setState({ activeTabId: tab.id });
  };

  render() {
    const shouldHideForE2E = global.self === global.top;
    const { className, showTabs } = this.props;
    return (
      <div>
        {showTabs && (
          <Tabs
            activeId={this.getNormalizedTabName()}
            onClick={this.onTabClick}
            items={this.props.tabs.map(createTab)}
            className={className}
          />
        )}

        {React.Children.map(this.props.children, (child, index) =>
          this.isActiveTab(index) ? child : null,
        )}
      </div>
    );
  }
}
