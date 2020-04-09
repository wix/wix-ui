import * as React from 'react';

import { HorizontalMenuItem } from './horizontal-menu-item';
import HorizontalMenuColumnsLayout from './horizontal-menu-columns-layout';
import HorizontalMenuGridLayout from './horizontal-menu-grid-layout';
import {
  HorizontalMenuContext,
  HorizontalMenuContextValue,
} from './HorizontalMenuContext';
import { HORIZONTAL_MENU_METADATA } from './constants';

import { style, classes } from './HorizontalMenu.st.css';

export interface HorizontalMenuProps {
  className?: string;

  /** Nav inline styles */
  style?: React.CSSProperties;

  /** Menu inline styles */
  menuStyle?: React.CSSProperties;
}

/** Horizontal menu */
export class HorizontalMenu extends React.PureComponent<HorizontalMenuProps> {
  static displayName = HORIZONTAL_MENU_METADATA.displayNames.menu;

  static Item = HorizontalMenuItem;

  static Layout = {
    Columns: HorizontalMenuColumnsLayout,
    Grid: HorizontalMenuGridLayout,
  };

  rootRef: React.RefObject<HTMLUListElement> = React.createRef();
  contextValue: HorizontalMenuContextValue = null;

  constructor(props: HorizontalMenuProps) {
    super(props);

    this.contextValue = {
      menuItemClassName: style.menuItem,
      columnsLayoutClassName: style.columnsLayout,
      gridLayoutClassName: style.gridLayout,
      rootMenuRef: this.rootRef,
    };
  }

  render() {
    const {
      children,
      className,
      style: propStyle,
      menuStyle,
      ...rest
    } = this.props;

    return (
      <HorizontalMenuContext.Provider value={this.contextValue}>
        <nav
          className={style(classes.root, {}, this.props.className)}
          data-hook={HORIZONTAL_MENU_METADATA.dataHooks.navigation}
          style={propStyle}
          {...rest}
          ref={this.rootRef}
        >
          <ul
            data-hook={HORIZONTAL_MENU_METADATA.dataHooks.container}
            className={classes.menu}
            style={menuStyle}
          >
            {children}
          </ul>
        </nav>
      </HorizontalMenuContext.Provider>
    );
  }
}
