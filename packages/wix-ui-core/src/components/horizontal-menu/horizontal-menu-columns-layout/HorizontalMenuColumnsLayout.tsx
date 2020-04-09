import * as React from 'react';
import * as classnames from 'classnames';

import {
  HorizontalMenuContext,
  withHorizontalMenuContext,
  HorizontalMenuContextValue,
} from '../HorizontalMenuContext';
import { HORIZONTAL_MENU_METADATA } from '../constants';
import {
  withHorizontalMenuItemContext,
  HorizontalMenuItemContextValue,
} from '../horizontal-menu-item/HorizontalMenuItemContext';
import { calculatePositioning } from '../horizontal-menu-layout/calculatePositioning';

import { style, classes } from './HorizontalMenuColumnsLayout.st.css';

export enum ColumnsAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
  Justify = 'justify',
}

export interface HorizontalMenuColumnsLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  maxOverflowWidth?: number;
  menuContext: HorizontalMenuContextValue;
  menuItemContext: HorizontalMenuItemContextValue;
  columnGap?: number;
  columns?: number;
  columnsAlignment?: ColumnsAlignment;
}

export interface HorizontalMenuColumnsLayoutState {
  styles: React.CSSProperties;
}

/** Horizontal Menu Column Layout */
export class HorizontalMenuColumnsLayout extends React.Component<
  HorizontalMenuColumnsLayoutProps,
  HorizontalMenuColumnsLayoutState
> {
  static displayName = HORIZONTAL_MENU_METADATA.displayNames.columnsLayout;

  static defaultProps = {
    columns: 1,
  };

  layoutRef: React.RefObject<HTMLDivElement> = React.createRef();

  state = {
    styles: {},
  };

  componentDidMount() {
    this.recalculatePositions();
  }

  componentDidUpdate(prevProps: HorizontalMenuColumnsLayoutProps) {
    const {
      menuItemContext: { isOpen, expandSize },
    } = this.props;

    if (
      (isOpen !== prevProps.menuItemContext.isOpen && isOpen) ||
      expandSize !== prevProps.menuItemContext.expandSize
    ) {
      this.recalculatePositions();
    }
  }

  recalculatePositions() {
    const { maxOverflowWidth, menuItemContext } = this.props;

    this.setState({
      styles: calculatePositioning({
        maxOverflowWidth,
        layoutRef: this.layoutRef,
        rootMenuRef: menuItemContext.rootMenuRef,
        expandSize: menuItemContext.expandSize,
        menuItemRef: menuItemContext.menuItemRef,
      }),
    });
  }

  render() {
    const {
      menuContext,
      menuItemContext,
      columnGap,
      columns,
      columnsAlignment,
    } = this.props;
    const { styles: stateStyles } = this.state;

    const styles = {
      ...this.props.style,
      ...stateStyles,
    };

    return (
      <HorizontalMenuContext.Provider
        value={{
          ...menuContext,
          menuItemClassName: classnames(
            menuContext.menuItemClassName,
            classes.menuItem,
          ),
        }}
      >
        <div
          data-hook={HORIZONTAL_MENU_METADATA.dataHooks.columnsLayout}
          data-layout="column"
          data-opened={menuItemContext.isOpen}
          ref={this.layoutRef}
          className={classnames(
            style(
              classes.root,
              { expandSize: menuItemContext.expandSize, columnsAlignment },
              this.props,
            ),
            menuContext.columnsLayoutClassName,
          )}
          style={styles}
        >
          <ul style={{ columns, columnGap }} className={classes.listWrapper}>
            {this.props.children}
          </ul>
        </div>
      </HorizontalMenuContext.Provider>
    );
  }
}

export default withHorizontalMenuContext(
  withHorizontalMenuItemContext(HorizontalMenuColumnsLayout),
);
