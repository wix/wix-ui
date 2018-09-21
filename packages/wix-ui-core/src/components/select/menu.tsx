import * as React from 'react';

import style from './menu.st.css';
import {Option} from './option';

export interface MenuProps {
  children: React.ReactNode;
  dataHook?: string;
  className?: string;
}

Option.displayName = 'Menu.Item';

export class Menu extends React.PureComponent<MenuProps> {
  static displayName = 'Menu';
  static Item = Option;

  render() {
    const {dataHook, ...rest} = this.props;
    return (
      <div {...style('root', {}, this.props)} data-hook={dataHook} {...rest} />
    );
  }
}
