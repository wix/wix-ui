import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {string} from 'prop-types';
import hoistNonReactMethods from 'hoist-non-react-methods';

export interface WixComponentProps {
  dataHook?: string;
  dataClass?: string;
}

const isStatelessComponent = Component => true;

export const createHOC = Component => {
  class WixComponent extends React.PureComponent<WixComponentProps> {
    static propTypes = {
      ...Component.propTypes,
      dataHook: string,
      dataClass: string
    };

    static displayName = Component.displayName || 'WixComponent';

    componentDidMount() {
      const {dataHook, dataClass} = this.props;
      if (dataHook || dataClass) {
        const domNode = ReactDOM.findDOMNode(this);
        if (domNode) {
          dataHook && domNode.setAttribute('data-hook', dataHook);
          dataClass && domNode.setAttribute('data-class', dataClass);
        }
      }
    }

    render() {
      // Can't pass refs to stateless components (and also there's nothing to hoist)
      return isStatelessComponent(Component)
        ? (<Component {...this.props}/>)
        : (<Component ref="wrappedComponent" {...this.props}/>);
    }
  }

  return isStatelessComponent(Component)
    ? WixComponent
    : hoistNonReactMethods(WixComponent, Component, {delegateTo: c => c.refs.wrappedComponent, hoistStatics: true});
};
