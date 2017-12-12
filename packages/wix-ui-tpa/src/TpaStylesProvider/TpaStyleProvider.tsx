import * as React from 'react';
import {object} from 'prop-types';
import {WixSdk} from '../WixSdk/WixSdk.d';

interface TpaStylesProviderProps {
  children: any;
  wixSdk: WixSdk;
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
    this.state = {tpaStyles: props.wixSdk.Styles.getStyleParams()};
  }

  componentDidMount() {
    events.forEach(event => this.props.wixSdk.addEventListener(event, this.update));
  }

  componentWillUnmount() {
    events.forEach(event => this.props.wixSdk.removeEventListener(event, this.update));
  }

  update() {
    this.setState({tpaStyles: this.props.wixSdk.Styles.getStyleParams()});
  }

  render() {
    return this.props.children;
  }

  getChildContext() {
    const {colors, fonts} = this.state.tpaStyles;
    return {colors, fonts};
  }
}
