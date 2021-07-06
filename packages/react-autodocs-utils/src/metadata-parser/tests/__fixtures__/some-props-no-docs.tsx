import * as React from 'react';
export interface Propies {
  /** this prop is documented */
  cool?: string;

  notCool?: any;
}

/** This is the component */
export class Component extends React.Component<Propies> {
  render() {
    return <div>{this.props.cool}</div>;
  }
}
