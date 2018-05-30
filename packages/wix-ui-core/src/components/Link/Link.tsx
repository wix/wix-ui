import * as React from 'react';
import {node, Requireable} from 'prop-types';

import style from './Link.st.css';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLElement> {
  /* children to be rendered inside Link */
  children?: any;
}

/**
 * Link
 */
export class Link extends React.PureComponent<LinkProps> {
  static displayName = 'Link';

  static propTypes = {
    children: node
  };

  static defaultProps: Partial<LinkProps> = {
    children: ''
  };

  render() {
    const {
      children,
      ...rest
    } = this.props;

    return React.createElement(
      children.type === 'a' ? 'span' : 'a',
      {
        children,
        ...rest,
        ...style('root', {}, this.props)
      }
    );
  }
}
