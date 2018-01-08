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
const Text: React.SFC<TextProps> = ({classes, children, ellipsis, tagName, forceHideTitle}) => (
  React.createElement(
    tagName,
    {
      className: classnames(classes.root, {[classes.ellipsis] : ellipsis}),
      title: typeof children === 'string' && ellipsis && !forceHideTitle ? children : null
    },
    children
  )
);

Text.displayName = 'Text';
Text.defaultProps = {
  tagName: 'span'
};

Text.propTypes = {
  /** should the text be ellipsed or not */
  ellipsis: bool,
  /** should hide the title tooltip that is shown on mouse hover when using the ellipsis prop */
  forceHideTitle: bool,
  /** tag name that will be rendered */
  tagName: string,
  /** any nodes to be rendered (usually text nodes) */
  children: any
};

export default createHOC(Text);
