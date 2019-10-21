import * as React from 'react';

import styles from './HorizontalMenuColumnLayout.st.css';

export interface HorizontalMenuColumnLayoutProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Horizontal Menu Column Layout */
export class HorizontalMenuColumnLayout extends React.PureComponent<
  HorizontalMenuColumnLayoutProps
> {
  static displayName = 'HorizontalMenuColumnLayout';

  render() {
    return (
      <ul
        {...styles('root', {}, this.props)}
        data-hook="horizontal-menu-column-layout"
        data-layout="column"
        style={this.props.style}
      >
        {this.props.children}
      </ul>
    );
  }
}
