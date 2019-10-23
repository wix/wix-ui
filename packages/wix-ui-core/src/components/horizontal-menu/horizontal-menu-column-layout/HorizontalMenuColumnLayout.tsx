import * as React from 'react';

import styles from './HorizontalMenuColumnLayout.st.css';

export interface HorizontalMenuColumnLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  textAlign?: 'left' | 'center' | 'right';
  columns?: number;
}

/** Horizontal Menu Column Layout */
export class HorizontalMenuColumnLayout extends React.PureComponent<
  HorizontalMenuColumnLayoutProps
> {
  static displayName = 'HorizontalMenuColumnLayout';

  static defaultProps = {
    columns: 1,
  };

  render() {
    const { textAlign, columns } = this.props;

    return (
      <ul
        {...styles('root', {}, this.props)}
        data-hook="horizontal-menu-column-layout"
        data-layout="column"
        style={{ ...this.props.style, textAlign, columns }}
      >
        {this.props.children}
      </ul>
    );
  }
}
