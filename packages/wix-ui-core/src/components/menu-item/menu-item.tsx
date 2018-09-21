import * as React from 'react';

import style from './menu-item.st.css';

export interface Props {
  children?: React.ReactNode;
  dataHook?: string;
}

export class MenuItem extends React.PureComponent<Props> {
  static displayName = 'Menu.Item';

  render() {
    return <div {...style('root', {}, this.props)} {...this.props} />;
  }
}
