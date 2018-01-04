import * as React from 'react';
import * as uniqueId from 'lodash.uniqueid';
import {generateClasses, detachStyleSheetFromDom} from './domStyleRenderer';
const hoistNonReactStatics = require('hoist-non-react-statics');

export interface ThemedComponentProps {
  theme?: object;
}

export interface HasClasses {
  classes?: object;
}

export function withClasses<P>(CoreComponent: React.ComponentType<P & HasClasses>, styles: Function): React.ComponentClass<P & ThemedComponentProps> {
  class ThemedComponent extends React.PureComponent<ThemedComponentProps & P, HasClasses> {
    private id;

    constructor(props) {
      super(props);
      this.id = uniqueId();
      this.state = {classes: generateClasses(styles(props.theme), this.id)};
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.theme !== nextProps.theme) {
        this.setState({classes: generateClasses(styles(nextProps.theme), this.id)});
      }
    }

    componentWillUnmount() {
      detachStyleSheetFromDom(this.id);
    }

    render() {
      let coreProps = Object.assign({}, this.props, {theme: undefined});

      return (
        <CoreComponent {...coreProps} classes={this.state.classes}/>
      );
    }
  }

  return hoistNonReactStatics(ThemedComponent, CoreComponent, {inner: true});
}
