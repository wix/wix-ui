import * as React from 'react';
export interface Props {
  /** this is a text prop */
  text?: string;
}

/** This is the component */
export class Component extends React.Component<Props> {
  render() {
    return <div>{this.props.text}</div>;
  }
}
