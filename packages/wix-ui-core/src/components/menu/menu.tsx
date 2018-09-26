import * as React from 'react';
import * as PropTypes from 'prop-types';

import {MenuItem} from '../menu-item/menu-item';
import style from './menu.st.css';

export interface Props {
  /** Menu.Item to be rendered within Menu. Note only Menu.Item is available as children */
  children?: React.ReactElement<MenuItem>[];
  onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

export class Menu extends React.PureComponent<Props> {
  static displayName = 'Menu';
  static Item = MenuItem;

  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func
  };

  render() {
    const {children, ...rest} = this.props;
    const filteredChildren = React.Children.toArray(children)
      .filter(child => (child as React.ReactElement<any>).type === MenuItem)
      .map(child =>
        React.cloneElement(child as React.ReactElement<any>, {
          'data-hook': 'menu-item'
        })
      );
    return (
      <div {...style('root', {}, this.props)} {...rest}>
        {filteredChildren}
      </div>
    );
  }
}
