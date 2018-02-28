import * as React from 'react';
import {bool, func, object, string, any} from 'prop-types';
import style from './Text.st.css';

export interface TextProps {
  children?: React.ReactNode;
  ellipsis?: boolean;
  forceHideTitle?: boolean;
  tagName?: string;
  className?: string;
}
/**
 * Text
 */
export const Text: React.SFC<TextProps> = props => {
  const {children, ellipsis, tagName, forceHideTitle} = props;
  return React.createElement(
    tagName,
    {
      title: typeof children === 'string' && ellipsis && !forceHideTitle ? children : null,
      ...style('root', {ellipsis}, props)
    },
    children
  );
};

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
