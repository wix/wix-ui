import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tabs from 'wix-style-react/Tabs';

const createTab = id => ({title: id, id});

export default class TabbedView extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTabId: props.tabs[0]
    };
  }

  onTabClick = tab =>
    this.setState({activeTabId: tab.id});

  render() {
    const shouldHideForE2E = global.self === global.top;

    return (
      <div>
        {!shouldHideForE2E &&
          <Tabs
            activeId={this.state.activeTabId}
            onClick={this.onTabClick}
            items={this.props.tabs.map(createTab)}
            />
        }

        {React.Children.map(
          this.props.children,
          (child, index) => this.state.activeTabId === this.props.tabs[index] ? child : null
        )}
      </div>
    );
  }
}
