import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default class TextButton extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    prefixIcon: PropTypes.node,
    children: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };

    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({
      isHover: !this.state.isHover
    });
  }

  render() {
    const buttonColor = this.state.isHover ? '#4EB7F5' : '#3899EC';

    const style = {
      color: buttonColor,
      outline: 'none',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      lineHeight: 0
    };

    return (
      <button
        className={styles.root}
        style={style}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={this.props.onClick}
      >
        {this.props.prefixIcon ? (
          <div
            style={{
              padding: '0 6px 0 0',
              lineHeight: '0 !important'
            }}
          >
            {this.props.prefixIcon}
          </div>
        ) : null}
        {this.props.children}
      </button>
    );
  }
}
