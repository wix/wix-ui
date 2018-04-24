import * as React from 'react';
import {node, string, Requireable} from 'prop-types';

import style from './Link.st.css';

export interface LinkProps {
  /* a url to be opened on link click */
  src?: string;

  /* children to be rendered inside Link */
  children?: any;

  dataHook?: string;
}

/**
 * Link
 */
export class Link extends React.PureComponent<LinkProps & React.AnchorHTMLAttributes<HTMLElement>> {
  static displayName = 'Link';

  static propTypes = {
    src: string,
    children: node,
    dataHook: string
  };

  static defaultProps: Partial<LinkProps> = {
    children: ''
  };

  render() {
    const {src: href, children, dataHook, ...rest} = this.props;

    return React.createElement(
      children.type === 'a' ? 'span' : 'a',
      {
        href,
        children,
        'data-hook': dataHook,
        ...style('root', {}, this.props),
        ...rest
      }
    );
  }
}
