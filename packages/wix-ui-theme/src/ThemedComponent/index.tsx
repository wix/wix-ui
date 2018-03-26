import * as React from 'react';
import {ReactElement} from 'react';
const pickBy = require('lodash/pickBy');

export type Theme = ((props: any) => Object) | Object;

export interface ThemedComponentState {
  calculatedTheme: Object | undefined;
}

export interface ThemedComponentProps {
  theme?: Theme;
  children: ReactElement<any>;
  [propName: string]: any;
}

export class ThemedComponent extends React.PureComponent<ThemedComponentProps, ThemedComponentState> {
  static defaultProps = {theme: () => ({})};

  constructor(props: ThemedComponentProps) {
    super(props);
    const {children, theme, ...propsForTheme} = props;
    this.state = {calculatedTheme: getTheme(theme, propsForTheme)};
  }

  componentWillReceiveProps(nextProps: ThemedComponentProps) {
    const {children, theme, ...propsForTheme} = nextProps;

    const changedProps = pickBy({theme, ...propsForTheme}, (value: string, key: any) => this.props[key] !== value);

    if (Object.keys(changedProps).length > 0) {
      this.setState({calculatedTheme: getTheme(theme, propsForTheme)});
    }
  }

  render() {
    const {calculatedTheme} = this.state;
    return React.cloneElement(this.props.children, {theme: calculatedTheme});
  }
}

function getTheme(theme: Theme | undefined, params?: Object): Object | undefined {
  return typeof theme === 'function' ? theme(params) : theme;
}
