import * as React from 'react';

import style from './Menu.st.css';

export interface MenuProps {
  children: React.ReactNode;
}

export class Menu extends React.PureComponent<MenuProps> {
  render() {
    return <div {...style('root')} {...this.props} />;
  }
}
