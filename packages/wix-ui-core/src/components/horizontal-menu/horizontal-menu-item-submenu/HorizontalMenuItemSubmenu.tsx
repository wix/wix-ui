import * as React from 'react';

import styles from './HorizontalMenuItemSubmenu.st.css';

export interface HorizontalMenuItemSubmenuProps {
  style?: React.CSSProperties;
}

export class HorizontalMenuItemSubmenu extends React.Component<
  HorizontalMenuItemSubmenuProps
> {
  render() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return (
      <div
        {...styles('root', {}, this.props)}
        style={this.props.style}
        data-hook="horizontal-menu-item-submenu"
      >
        {children}
      </div>
    );
  }
}
