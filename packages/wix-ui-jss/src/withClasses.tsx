import * as React from 'react';
import {generateClasses, detachStyleSheetFromDom} from './domStyleRenderer';
import hoistNonReactMethods from 'hoist-non-react-methods';
const uniqueId = require('lodash/uniqueId');

const isStatelessComponent = Component => !(Component.prototype && Component.prototype.render);

export interface ThemedComponentProps {
  theme?: object;
}

export interface HasClasses {
  classes?: object;
}

export function withClasses<P extends {ref?: string}>(CoreComponent: React.ComponentType<P & HasClasses>, styles: Function): React.ComponentClass<P & ThemedComponentProps> {
  class ThemedComponent extends React.PureComponent<ThemedComponentProps & P, HasClasses> {
    private id;
    private wrappedComponentRef: React.Component = null;
    static displayName = CoreComponent.displayName || 'ThemedComponent';

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

      return isStatelessComponent(CoreComponent)
        ? (<CoreComponent {...coreProps} classes={this.state.classes}/>)
        : (<CoreComponent ref={ref => this.wrappedComponentRef = ref} {...coreProps} classes={this.state.classes} />);
    }
  }

  return isStatelessComponent(CoreComponent)
    ? ThemedComponent
    : hoistNonReactMethods(ThemedComponent, CoreComponent, {delegateTo: c => c.wrappedComponentRef, hoistStatics: true});
}
