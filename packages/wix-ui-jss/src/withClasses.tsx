import * as React from 'react';
import * as uniqueId from 'lodash.uniqueid';
import {generateClasses, detachStyleSheetFromDom} from './domStyleRenderer';
const hoistNonReactStatics = require('hoist-non-react-statics');

interface ThemedComponentProps {
  theme?: object;
}

interface ThemedComponentState {
  classes: object;
}

export const withClasses = <TProps extends {}> (CoreComponent, styles) => {
  class ThemedComponent extends React.PureComponent<ThemedComponentProps & TProps, ThemedComponentState> {
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
      return (
        <CoreComponent {...this.props} classes={this.state.classes}/>
      );
    }
  }

  hoistNonReactStatics(ThemedComponent, CoreComponent, {inner: true});
  return ThemedComponent;
};
