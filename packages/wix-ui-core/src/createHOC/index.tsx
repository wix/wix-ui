import * as React from 'react';
import {string} from 'prop-types';
import * as ReactDOM from 'react-dom';
const hoistNonReactStatics = require('hoist-non-react-statics');

interface WixComponentProps {
  dataHook?: string;
  dataClass?: string;
}

export const createHOC = <TProps extends {}> (Component) => {
  class WixComponent extends React.PureComponent<WixComponentProps & TProps> {
    static propTypes = {
      ...Component.propTypes,
      dataHook: string,
      dataClass: string
    };

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

  hoistNonReactStatics(WixComponent, Component, {inner: true});
  return WixComponent;
};
