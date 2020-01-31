import * as React from 'react';
import * as ReactDOM from 'react-dom';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export interface PortalProps {
  children?: React.ReactElement;
  node?: any;
}

class Portal extends React.PureComponent<PortalProps> {
  defaultNode = null;

  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  render() {
    if (!canUseDOM) {
      return null;
    }
    if (!this.props.node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }
    return ReactDOM.createPortal(
      this.props.children,
      this.props.node || this.defaultNode,
    );
  }
}

export default Portal;
