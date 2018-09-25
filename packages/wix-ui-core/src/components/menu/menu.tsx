import * as React from 'react';

import {MenuItem} from '../menu-item/menu-item';
import style from './menu.st.css';

export interface Props {
  children?: React.ReactElement<MenuItem>[];
  onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
  dataHook?: string;
}

export class Menu extends React.PureComponent<Props> {
  static displayName = 'Menu';
  static Item = MenuItem;

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
