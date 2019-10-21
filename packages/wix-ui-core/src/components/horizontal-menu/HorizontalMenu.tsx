import * as React from 'react';

import { HorizontalMenuItem } from './horizontal-menu-item';
import { HorizontalMenuOption } from './horizontal-menu-option';
import { HorizontalMenuColumnLayout } from './horizontal-menu-column-layout';
import { HorizontalMenuGridLayout } from './horizontal-menu-grid-layout';
import { HorizontalMenuListLayout } from './horizontal-menu-list-layout';

import styles from './HorizontalMenu.st.css';

export interface HorizontalMenuProps {
  className?: string;

  /** Menu inline styles */
  style?: React.CSSProperties;

  /** Render items with divider */
  withDividers?: boolean;

  /** Equal items width */
  withEqualItems?: boolean;

  /** <HorizontalMenu.Item /> text-align */
  textAlign?: 'left' | 'center' | 'right';

  /** justify-content of <HorizontalMenu.Item /> */
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | string;
}

/** Horizontal menu */
export class HorizontalMenu extends React.PureComponent<HorizontalMenuProps> {
  static displayName = 'HorizontalMenu';

  static Item = HorizontalMenuItem;

  static Layout = {
    Column: HorizontalMenuColumnLayout,
    Grid: HorizontalMenuGridLayout,
    List: HorizontalMenuListLayout,
  };

  static Option = HorizontalMenuOption;

  static defaultProps = {
    withDividers: false,
    withEqualItems: true,
    justifyContent: 'flex-start',
  };

  render() {
    const {
      textAlign = 'left',
      justifyContent,
      withDividers,
      withEqualItems,
      children,
    } = this.props;

    return (
      <nav
        role="navigation"
        {...styles('root', { withEqualItems, withDividers }, this.props)}
        data-hook="horizontal-menu-navigation"
        style={this.props.style}
      >
        <ul
          className={styles.menu}
          style={{ textAlign, justifyContent }}
          data-hook="horizontal-menu-container"
        >
          {children}
        </ul>
      </nav>
    );
  }
}
