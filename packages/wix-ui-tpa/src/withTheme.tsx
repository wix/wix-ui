import * as React from 'react';
import {withTpaStyles} from './TpaStylesProvider/withTpaStyles';

interface TpaComponentProps {
  wixBindings: object;
  colors: object;
  fonts: object;
}

interface TpaComponentState {
  calculatedTheme: object;
}

export function withTheme({Component, theme}) {
  class TpaComponent extends React.PureComponent<TpaComponentProps, TpaComponentState> {
    static defaultProps = {
      wixBindings: {}
    };

    static displayName = Component.displayName;

    constructor(props: TpaComponentProps) {
      super(props);
      const {wixBindings, colors, fonts} = props;
      this.state = {calculatedTheme: theme({wixBindings, colors, fonts})};
    }

    componentWillReceiveProps(nextProps: TpaComponentProps) {
      const {wixBindings, colors, fonts} = nextProps;

      if (this.props.colors !== colors || this.props.fonts !== fonts) {
        this.setState({calculatedTheme: theme({wixBindings, colors, fonts})});
      }
    }

    render() {
      const {wixBindings, colors, fonts, ...coreProps} = this.props;
      return <Component {...coreProps} theme={this.state.calculatedTheme}/>;
    }
  }

  return withTpaStyles(TpaComponent);
}
