import * as React from 'react';
import {string} from 'prop-types';
import * as ReactDOM from 'react-dom';

interface WixComponentProps {
  dataHook: string;
}

export const createHOC = Component => {
  class WixComponent extends React.PureComponent<WixComponentProps> {
    static propTypes = {dataHook: string};

    componentDidMount() {
      const {dataHook} = this.props;
      if (dataHook) {
        const domNode = ReactDOM.findDOMNode(this);
        if (domNode) {
          domNode.setAttribute('data-hook', dataHook);
        }
      }
    }

    render() {
      return <Component {...this.props}/>;
    }
  }

  return WixComponent;
};
