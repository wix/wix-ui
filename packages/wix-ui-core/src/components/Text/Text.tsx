import * as React from 'react';
import * as classnames from 'classnames';
import {bool, string, any} from 'prop-types';
import {createHOC} from '../../createHOC';

export type TextClasses = {
  root: string;
  ellipsis: string;
};

export interface TextProps {
  classes?: TextClasses;
  children?: React.ReactNode;
  ellipsis?: boolean;
  forceHideTitle?: boolean;
  tagName?: string;
}

/**
 * Text
 */
class Text extends  React.PureComponent<TextProps> {
  static displayName = 'Text';

  static defaultProps = {
    tagName: 'span'
  };

  static propTypes = {
    /** should the text be ellipsed or not */
    ellipsis: bool,
    /** should hide the title tooltip that is shown on mouse hover when using the ellipsis prop */
    forceHideTitle: bool,
    /** tag name that will be rendered */
    tagName: string,
    /** any nodes to be rendered (usually text nodes) */
    children: any
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
