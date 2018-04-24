import * as React from 'react';
import {string, Requireable} from 'prop-types';

import style from './Link.st.css';

export interface LinkProps {
  /* a url to be opened on link click */
  src?: string;

  /* children to be rendered inside Link */
  children?: any;
}

export interface LinkState {
}

/**
 * Link
 */
export class Link extends React.PureComponent<LinkProps, LinkState> {
  static displayName = 'Link';

  static propTypes = {
    src: string
  };

  static defaultProps: Partial<LinkProps> = {
    children: ''
  };

  render() {
    const {src: href, children} = this.props;

    return React.createElement(
      children.type === 'a' ? 'span' : 'a',
      {
        href,
        children
      }
    );
  }
}
