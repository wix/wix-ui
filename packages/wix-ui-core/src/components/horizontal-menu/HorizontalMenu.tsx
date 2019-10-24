import * as React from 'react';

import { HorizontalMenuItem } from './horizontal-menu-item';
import { HorizontalMenuColumnLayout } from './horizontal-menu-column-layout';
import { HorizontalMenuGridLayout } from './horizontal-menu-grid-layout';

import styles from './HorizontalMenu.st.css';

export interface HorizontalMenuProps {
  className?: string;

  /** Menu inline styles */
  style?: React.CSSProperties;

  /** Render items with divider */
  withDividers?: boolean;

  /** Equal items width */
  withEqualItemWidth?: boolean;

  textAlign?: 'left' | 'center' | 'right';

  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
}

/** Horizontal menu */
export class HorizontalMenu extends React.PureComponent<HorizontalMenuProps> {
  static displayName = 'HorizontalMenu';

  static Item = HorizontalMenuItem;

  static Layout = {
    Column: HorizontalMenuColumnLayout,
    Grid: HorizontalMenuGridLayout,
  };

  static defaultProps: Partial<HorizontalMenuProps> = {
    withDividers: false,
    withEqualItemWidth: true,
    textAlign: 'left',
    justifyContent: 'flex-start',
  };

  render() {
    const {
      children,
      justifyContent,
      textAlign,
      withDividers,
      withEqualItemWidth,
    } = this.props;

    const childrenLength = React.Children.count(children);

    return (
      <nav
        role="navigation"
        {...styles('root', { withEqualItemWidth }, this.props)}
        data-hook="horizontal-menu-navigation"
        style={{ ...this.props.style, textAlign }}
      >
        <ul
          className={styles.menu}
          style={{ justifyContent }}
          data-hook="horizontal-menu-container"
        >
          {withDividers
            ? React.Children.map(children, (child, index) => (
                <React.Fragment>
                  {child}
                  {index !== childrenLength - 1 && (
                    <div className={styles.divider} />
                  )}
                </React.Fragment>
              ))
            : children}
        </ul>
      </nav>
    );
  }
}
