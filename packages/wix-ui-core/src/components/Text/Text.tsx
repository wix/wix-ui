import * as React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import {createHOC} from '../../createHOC';

  type TextClasses = {
    root: string;
    ellipsis: string;
  };

  interface TextProps {
    classes: TextClasses;
    children: PropTypes.string;
    ellipsis: PropTypes.bool;
    forceHideTitle: PropTypes.bool;
    tagName: PropTypes.string;
  }

  class Text extends  React.PureComponent<TextProps> {
  static displayName = 'Text';

  static defaultProps = {
    tagName: 'span'
  };

  getTitle = () => {
    const {forceHideTitle, ellipsis, children} = this.props;
    const showTitle = typeof children === 'string' && ellipsis && !forceHideTitle;
    return showTitle ? children : null;
  }

  render() {
    const {classes, children, ellipsis, tagName} = this.props;
    const cssClasses = classnames(classes.root, {[classes.ellipsis] : ellipsis});
    return React.createElement(tagName, {className: cssClasses, title: this.getTitle()}, children);
  }
}



export default createHOC(Text);
