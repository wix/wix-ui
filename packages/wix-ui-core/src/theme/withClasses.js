import React from 'react';
import {findDOMNode} from 'react-dom';
import {object} from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import {generateClasses, detachStyleSheetFromDom} from './DOMStyleRenderer';

export function withClasses(CoreComponent, styles) {
  class ThemedComponent extends React.PureComponent {
    static propTypes = {
      ...CoreComponent.propTypes,
      theme: object
    };

    constructor(props) {
      super(props);
      this.id = uniqueId();
      this.state = {
        rtl: false,
        classes: generateClasses({
          styles: styles(props.theme),
          componentId: this.id,
          rtl: false
        })
      };
    }

    componentDidMount() {
      let domNode = findDOMNode(this);
      while (domNode) {
        if (isContainingRtlClass(domNode)) {
          this.setState({
            rtl: true,
            classes: generateClasses({
              styles: styles(this.props.theme),
              componentId: this.id,
              rtl: true
            })
          });
          return;
        }
        domNode = domNode.parentElement;
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.theme !== nextProps.theme) {
        this.setState({
          classes: generateClasses({
            styles: styles(nextProps.theme),
            componentId: this.id,
            rtl: this.state.rtl
          })
        });
      }
    }

    componentWillUnmount() {
      detachStyleSheetFromDom(this.id);
    }

    render() {
      // eslint-disable-next-line no-unused-vars
      const {theme, ...coreProps} = this.props;
      return (
        <CoreComponent {...coreProps} classes={this.state.classes}/>
      );
    }
  }

  return ThemedComponent;
}

function isContainingRtlClass(domNode) {
  const className = domNode.getAttribute('class');
  return !!className && className.split(' ').indexOf('rtl') !== -1;
}
