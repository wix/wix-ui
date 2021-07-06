import * as React from 'react';
export interface Props {
  /** this is a text prop */
  text?: 'first' | 'second' | 'third';
  number?: 1 | 2 | 3;
}

/** This is the component */
export class Component extends React.Component<Props> {
  render() {
    return <div>{this.props.text}</div>;
  }
}
