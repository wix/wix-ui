import * as React from 'react';
import * as uniqueId from 'lodash.uniqueid';
import {generateClasses, detachStyleSheetFromDom} from './domStyleRenderer';

interface ThemedComponentProps {
  theme?: object;
  [coreProps: string]: any;
}

interface ThemedComponentState {
  classes: object;
}

export function withClasses(CoreComponent, styles) {
  class ThemedComponent extends React.PureComponent<ThemedComponentProps, ThemedComponentState> {
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
      const {theme, ...coreProps} = this.props;
      return (
        <CoreComponent {...coreProps} classes={this.state.classes}/>
      );
    }
  }

  return ThemedComponent;
}
