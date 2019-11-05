import * as React from 'react';

import { HorizontalMenuItem } from './horizontal-menu-item';
import { HorizontalMenuColumnsLayout } from './horizontal-menu-columns-layout';
import { HorizontalMenuGridLayout } from './horizontal-menu-grid-layout';
import {
  HorizontalMenuContext,
  HorizontalMenuContextValue,
} from './HorizontalMenuContext';

import style from './HorizontalMenu.st.css';

export interface HorizontalMenuProps {
  className?: string;

  /** Menu inline styles */
  style?: React.CSSProperties;

  /** Divider between items */
  divider?: React.ReactNode;
}

/** Horizontal menu */
export class HorizontalMenu extends React.PureComponent<HorizontalMenuProps> {
  static displayName = 'HorizontalMenu';

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
    const {
      children,
      divider,
      className,
      style: propStyle,
      ...rest
    } = this.props;

    const childrenLength = React.Children.count(children);

    return (
      <HorizontalMenuContext.Provider value={this.contextValue}>
        <nav
          {...style('root', {}, this.props)}
          data-hook="horizontal-menu-navigation"
          style={propStyle}
          {...rest}
        >
          <ul
            data-hook="horizontal-menu-container"
            className={style.menu}
            ref={this.menuRef}
          >
            {divider
              ? React.Children.map(children, (child, index) => (
                  <React.Fragment key={index}>
                    {child}
                    {index !== childrenLength - 1 && divider}
                  </React.Fragment>
                ))
              : children}
          </ul>
        </nav>
      </HorizontalMenuContext.Provider>
    );
  }
}
