import React from 'react';
import {func, node, array} from 'prop-types';
import Wix from 'Wix';

class SdkThemeGenerator extends React.PureComponent {
  static propTypes = {
    render: func.isRequired,
    themeCreator: func.isRequired,
    events: array.isRequired
  };

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      calculatedTheme: props.themeCreator(),
      events: props.events.filter(event => Wix.Events[event] !== undefined)
    };
  }

  componentDidMount() {
    this.state.events.forEach(event => Wix.addEventListener(Wix.Events[event], this.update));
  }

  componentWillUnmout() {
    this.state.events.forEach(event => Wix.removeEventListener(Wix.Events[event], this.update));
  }

  update(data) {
    this.setState({calculatedTheme: this.props.themeCreator(data)});
  }

  render() {
    return this.props.render({calculatedTheme: this.state.calculatedTheme});
  }
}

export const ResponsiveThemedComponent = ({children, themeCreator, events}) => (
  <SdkThemeGenerator
    themeCreator={themeCreator}
    events={events}
    render={({theme}) => React.cloneElement(children, {theme})}
    />
);

ResponsiveThemedComponent.propTypes = {
  children: node,
  themeCreator: func,
  events: array
};

ResponsiveThemedComponent.defaultProps = {
  children: null,
  themeCreator: () => {},
  events: ['STYLE_PARAMS_CHANGE']
};

