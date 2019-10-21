import * as React from 'react';

import styles from './HorizontalMenuGridLayout.st.css';

export interface HorizontalMenuGridLayoutProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Horizontal Menu Grid Layout */
export class HorizontalMenuGridLayout extends React.PureComponent<
  HorizontalMenuGridLayoutProps
> {
  static displayName = 'HorizontalMenuGridLayout';

  render() {
    return (
      <ul
        {...styles('root', {}, this.props)}
        data-hook="horizontal-menu-grid-layout"
        data-layout="grid"
        style={this.props.style}
      >
        {this.props.children}
      </ul>
    );
  }
}
