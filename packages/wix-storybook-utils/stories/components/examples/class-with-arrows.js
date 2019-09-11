/* eslint-disable no-undef */
import React from 'react';

class Component extends React.Component {
  state = { value: 'test' };
  onChange = event => this.setState({ value: event.target.value });

  render() {
    return (
      <div>
        <input value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}

render(
  <div
    style={{
      background: 'teal',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 300,
      height: 300,
    }}
    children={<Component />}
  />,
);
