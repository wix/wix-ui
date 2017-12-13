import * as React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import {createHOC} from '../../createHOC';

  type TextClasses = {
    root: string;
    ellipsis: string;
  };

  interface TextProps {
    classes: TextClasses,
    children: PropTypes.any,
    ellipsis: PropTypes.bool,
    forceHideTitle: PropTypes.bool,
    tagName: PropTypes.string
  }

  class Text extends  React.PureComponent<TextProps> {
  static displayName = 'Text';

  getTitle = () => {
    const {forceHideTitle, ellipsis, children} = this.props;
    let title = null;
    if(typeof children === 'string' && ellipsis && !forceHideTitle){
      title = children;
    }
    return title
  }

  render() {
    const {classes, children, ellipsis, tagName} = this.props;
    const cssClasses = classnames(classes.root, {[classes.ellipsis] : ellipsis});
    return React.createElement(tagName || 'span', {className: cssClasses, title: this.getTitle()}, children)
  }
}


export default createHOC(Text);
