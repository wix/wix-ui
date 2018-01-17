import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class Shlomi extends React.Component<any, any> {
  static propTypes = {
    children: PropTypes.string
  };

  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}
