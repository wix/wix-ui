import * as React from 'react';
import {withTpaStyles} from './withTpaStyles';

interface TpaComponentProps {
  wixBindings: object;
  colors: object,
  fonts: object
}

interface TpaComponentState {
  calculatedTheme: object;
}

export function withTheme({CoreComponent, theme}) {
  class TpaComponent extends React.PureComponent<TpaComponentProps, TpaComponentState> {
    static defaultProps = {
      wixBindings: {}
    };

    static displayName = CoreComponent.displayName;

    constructor(props) {
      super(props);
      const {wixBindings, colors, fonts} = props;
      this.state = {calculatedTheme: theme({wixBindings, colors, fonts})};
    }

    componentWillReceiveProps(nextProps) {
      const {wixBindings, colors, fonts} = nextProps;
      
      if (this.props.colors !== nextProps.colors || this.props.fonts !== nextProps.fonts) {
          this.setState({calculatedTheme: theme({wixBindings, colors, fonts})});
      }
    }

    render() {
      const {wixBindings, colors, fonts, ...coreProps} = this.props;
      return <CoreComponent {...coreProps} theme={this.state.calculatedTheme}/>;
    }
  }
  return withTpaStyles(TpaComponent);
}
