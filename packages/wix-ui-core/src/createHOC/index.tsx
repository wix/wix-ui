import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {string} from 'prop-types';
import hoistNonReactMethods from 'hoist-non-react-methods';

export interface WixComponentProps {
  dataHook?: string;
  dataClass?: string;
}

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
      return <Component ref='wrappedComponent' {...this.props}/>;
    }
  }

  return hoistNonReactMethods(WixComponent, Component, {delegateTo: c => c.refs.wrappedComponent, hoistStatics: true});
};
