import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {string} from 'prop-types';
import hoistNonReactMethods from 'hoist-non-react-methods';

export interface WixComponentProps {
  dataHook?: string;
  dataClass?: string;
}

const isStatelessComponent = Component => !(Component.prototype && Component.prototype.render);

export const createHOC = Component => {
  class WixComponent extends React.PureComponent<WixComponentProps> {
    private wrappedComponentRef: React.Component = null;

    static propTypes = {
      ...Component.propTypes,
      dataHook: string,
      dataClass: string
    };

    static displayName = Component.displayName || Component.name || 'WixComponent';

    componentDidMount() {
      const {dataHook, dataClass} = this.props;
      if (dataHook || dataClass) {
        const domNode = ReactDOM.findDOMNode(this);
        if (domNode && 'setAttribute' in domNode) {
          dataHook && domNode.setAttribute('data-hook', dataHook);
          dataClass && domNode.setAttribute('data-class', dataClass);
        }
      }
    }

    render() {
      // Can't pass refs to stateless components (and also there's nothing to hoist)
      return isStatelessComponent(Component)
        ? (<Component {...this.props}/>)
        : (<Component ref={ref => this.wrappedComponentRef = ref} {...this.props}/>);
    }
  }

  return isStatelessComponent(Component)
    ? WixComponent
    : hoistNonReactMethods(WixComponent, Component, {delegateTo: c => c.wrappedComponentRef, hoistStatics: true});
};
