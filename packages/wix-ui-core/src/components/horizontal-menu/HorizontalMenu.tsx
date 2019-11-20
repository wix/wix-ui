import * as React from 'react';

import { HorizontalMenuItem } from './horizontal-menu-item';
import HorizontalMenuColumnsLayout from './horizontal-menu-columns-layout';
import HorizontalMenuGridLayout from './horizontal-menu-grid-layout';
import {
  HorizontalMenuContext,
  HorizontalMenuContextValue,
} from './HorizontalMenuContext';
import { HORIZONTAL_MENU_METADATA } from './constants';

import style from './HorizontalMenu.st.css';

export interface HorizontalMenuProps {
  className?: string;

  /** Menu inline styles */
  style?: React.CSSProperties;
}

/** Horizontal menu */
export class HorizontalMenu extends React.PureComponent<HorizontalMenuProps> {
  static displayName = HORIZONTAL_MENU_METADATA.displayNames.menu;

  static Item = HorizontalMenuItem;

  static Layout = {
    Columns: HorizontalMenuColumnsLayout,
    Grid: HorizontalMenuGridLayout,
  };

  menuRef: React.RefObject<HTMLUListElement> = React.createRef();
  contextValue: HorizontalMenuContextValue = null;

  constructor(props: HorizontalMenuProps) {
    super(props);

    this.contextValue = {
      menuItemClassName: style.menuItem,
      columnsLayoutClassName: style.columnsLayout,
      gridLayoutClassName: style.gridLayout,
      getMenuBoundingRect: this.getMenuBoundingRect,
    };
  }

  getMenuBoundingRect = (key: string) => {
    const { current } = this.menuRef;

    if (!current) {
      return 0;
    }

    return current.getBoundingClientRect()[key];
  };

  render() {
    const { children, className, style: propStyle, ...rest } = this.props;

    return (
      <HorizontalMenuContext.Provider value={this.contextValue}>
        <nav
          {...style('root', {}, this.props)}
          data-hook={HORIZONTAL_MENU_METADATA.dataHooks.navigation}
          style={propStyle}
          {...rest}
        >
          <ul
            data-hook={HORIZONTAL_MENU_METADATA.dataHooks.container}
            className={style.menu}
            ref={this.menuRef}
          >
            {children}
          </ul>
        </nav>
      </HorizontalMenuContext.Provider>
    );
  }
}
