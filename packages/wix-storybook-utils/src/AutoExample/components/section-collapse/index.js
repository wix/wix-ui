import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';
import Text from 'wix-style-react/Text';

import styles from './styles.scss';

export default class PropsCollapse extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    isOpen: false
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen
    };
  }

  toggleCollapse = () =>
    this.setState({isOpen: !this.state.isOpen});

  getNumChildren = () =>
    Object.keys(this.props.children).length;

  render() {
    return (
      <div>
        <div
          onClick={this.toggleCollapse}
          className={styles.head}
          >
          <Text appearance="H2">
            {this.props.title}
          </Text>

          <div className={styles.headSub}>
            { this.state.isOpen ? 'Hide' : 'Expand' }
          </div>
        </div>

        <Collapse isOpened={this.state.isOpen}>
          {this.props.children}
        </Collapse>
      </div>
    );
  }
}
