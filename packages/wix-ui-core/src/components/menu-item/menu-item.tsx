import * as React from 'react';
import * as PropTypes from 'prop-types';

import style from './menu-item.st.css';

export interface Props {
  /** any node to be rendered inside Menu.Item */
  children?: React.ReactNode;

  /** mouse click callback */
  onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

export class MenuItem extends React.PureComponent<Props> {
  static displayName = 'Menu.Item';

  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func
  };

  render() {
    return <div {...style('root', {}, this.props)} {...this.props} />;
  }
}
