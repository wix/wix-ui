import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {string} from 'prop-types';
const hoistNonReactStatics = require('hoist-non-react-statics');

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
      return <Component {...this.props}/>;
    }
  }

  return hoistNonReactStatics(WixComponent, Component, {inner: true});
};
