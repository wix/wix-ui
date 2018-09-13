import * as React from 'react';

import style from './menu.st.css';
import {Option} from './option';

export interface MenuProps {
  children: React.ReactNode;
}

export class Menu extends React.PureComponent<MenuProps> {
  static Item = Option;

  render() {
    return <div {...style('root')} {...this.props} />;
  }
}
