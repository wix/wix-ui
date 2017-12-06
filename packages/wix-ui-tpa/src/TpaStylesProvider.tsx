import * as React from 'react';
import {object} from 'prop-types';

interface WixSdk {
  Events: Array<string>,
  addEventListener: Function,
  removeEventListener: Function,
  Styles: {getStyleParams: Function}
}

interface TpaStylesProviderProps {
  children: any;
  Wix: WixSdk;
}

interface TpaStylesProviderState {
  tpaStyles: {
    colors: object,
    fonts: object
  }
}

const events = ['STYLE_PARAMS_CHANGE', 'THEME_CHANGE'];

export class TpaStylesProvider extends React.PureComponent<TpaStylesProviderProps, TpaStylesProviderState> {
  static childContextTypes = {
    colors: object,
    fonts: object
  };
  
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {tpaStyles: props.Wix.Styles.getStyleParams()};
  }

  componentDidMount() {
    events.forEach(event => this.props.Wix.addEventListener(this.props.Wix.Events[event], this.update));
  }

  componentWillUnmout() {
    events.forEach(event => this.props.Wix.removeEventListener(this.props.Wix.Events[event], this.update));
  }

  update() {
    this.setState({tpaStyles: this.props.Wix.Styles.getStyleParams()});
  }

  render() {
    return React.Children.only(this.props.children);
  }

  getChildContext() {
    const {colors, fonts} = this.state.tpaStyles;
    return {colors, fonts};
  }
}
