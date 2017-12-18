import * as React from 'react';
import {string} from 'prop-types';
import * as ReactDOM from 'react-dom';

interface WixComponentProps {
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

  return WixComponent;
};
