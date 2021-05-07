import * as React from 'react';

export interface StateFullComponentWrapProps {
  children?: any;
  [propName: string]: any;
}
export class StateFullComponentWrap extends React.Component<StateFullComponentWrapProps> {
  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(children, props);
  }
}
