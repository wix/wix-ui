import * as React from 'react';
import * as ReactDOM from 'react-dom';

const canUseDOM = !!(typeof window !== 'undefined' && window.document);

export interface PortalProps {
  children?: React.ReactElement;
  node?: any;
}

export class Portal extends React.PureComponent<PortalProps> {
  render() {
    if (!canUseDOM) {
      return null;
    }
    if (!this.props.node) {
      return this.props.children;
    }
    return ReactDOM.createPortal(this.props.children, this.props.node);
  }
}
