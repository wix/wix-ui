import * as React from 'react';
import * as pickBy from 'lodash.pickby';
import {ReactElement} from 'react';

export type Theme = ((props: any) => Object) | Object;

export type ThemeGeneratorState = {
  calculatedTheme: object
};

interface ThemeGeneratorProps {
  render: (state: ThemeGeneratorState) => React.ReactElement<any>;
  theme?: Theme;
}

interface ThemedComponentProps {
  theme?: Theme;
  children: ReactElement<any>;
  [propName: string]: any;
}

class ThemeGenerator extends React.PureComponent<ThemeGeneratorProps, ThemeGeneratorState> {
  constructor(props) {
    super(props);
    const {render, theme, ...propsForTheme} = props;
    this.state = {calculatedTheme: getTheme(theme, propsForTheme)};
  }

  componentWillReceiveProps(nextProps) {
    const {render, theme, ...propsForTheme} = nextProps;

    const changedProps = pickBy(propsForTheme, (value, key) => this.props[key] !== value);
    if (Object.keys(changedProps).length > 0) {
      this.setState({calculatedTheme: getTheme(theme, propsForTheme)});
    }
  }

  render() {
    const {calculatedTheme} = this.state;
    return this.props.render({calculatedTheme});
  }
}

export const ThemedComponent: React.SFC<ThemedComponentProps> = ({children, theme, ...propsForTheme}) => (
  <ThemeGenerator
    theme={theme}
    render={({calculatedTheme}) => React.cloneElement(children, {theme: calculatedTheme})}
    {...propsForTheme}
    />
);

ThemedComponent.defaultProps = {
  children: null,
  theme: () => ({})
};

function getTheme(theme: Theme, params?: object): object {
  return typeof theme === 'function' ? theme(params) : theme;
}
