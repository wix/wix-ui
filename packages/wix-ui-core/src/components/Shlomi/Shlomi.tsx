import * as React from 'react';

export default class Shlomi extends React.Component<any, any> {
  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}
