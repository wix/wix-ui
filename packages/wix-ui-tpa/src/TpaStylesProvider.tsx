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
  events: Array<string>,
  Wix: WixSdk
}

interface TpaStylesProviderState {
  events: Array<string>,
  tpaStyles: {
    colors: object,
    fonts: object
  }
}

export class TpaStylesProvider extends React.PureComponent<TpaStylesProviderProps, TpaStylesProviderState> {
  static defaultProps = {
    events: ['STYLE_PARAMS_CHANGE', 'THEME_CHANGE']
  };

  static childContextTypes = {
    colors: object,
    fonts: object
  };
  
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      events: props.events.filter(event => this.props.Wix.Events[event] !== undefined),
      tpaStyles: props.Wix.Styles.getStyleParams()
    };
  }

  componentDidMount() {
    this.state.events.forEach(event => this.props.Wix.addEventListener(this.props.Wix.Events[event], this.update));
  }

  componentWillUnmout() {
    this.state.events.forEach(event => this.props.Wix.removeEventListener(this.props.Wix.Events[event], this.update));
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
