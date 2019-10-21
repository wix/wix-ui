import * as React from 'react';

import styles from './HorizontalMenuListLayout.st.css';

export interface HorizontalMenuListLayoutProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Horizontal Menu List Layout */
export class HorizontalMenuListLayout extends React.PureComponent<
  HorizontalMenuListLayoutProps
> {
  static displayName = 'HorizontalMenuListLayout';

  render() {
    return (
      <ul
        {...styles('root', {}, this.props)}
        data-hook="horizontal-menu-list-layout"
        data-layout="list"
        style={this.props.style}
      >
        {this.props.children}
      </ul>
    );
  }
}
