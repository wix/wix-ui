import * as React from 'react';
import * as classnames from 'classnames';

import {
  HorizontalMenuContext,
  HorizontalMenuContextValue,
  withHorizontalMenuContext,
} from '../HorizontalMenuContext';
import { HORIZONTAL_MENU_METADATA } from '../constants';
import { calculatePositioning } from '../horizontal-menu-layout/calculatePositioning';
import {
  HorizontalMenuItemContextValue,
  withHorizontalMenuItemContext,
} from '../horizontal-menu-item/HorizontalMenuItemContext';

import style from './HorizontalMenuGridLayout.st.css';

export interface HorizontalMenuGridLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  maxOverflowWidth?: number;
  menuContext: HorizontalMenuContextValue;
  menuItemContext: HorizontalMenuItemContextValue;
}

export interface HorizontalMenuGridLayoutState {
  styles: React.CSSProperties;
}

/** Horizontal Menu Grid Layout */
export class HorizontalMenuGridLayout extends React.Component<
  HorizontalMenuGridLayoutProps,
  HorizontalMenuGridLayoutState
> {
  static displayName = HORIZONTAL_MENU_METADATA.displayNames.gridLayout;

  layoutRef: React.RefObject<HTMLDivElement> = React.createRef();

  state = {
    styles: {},
  };

  componentDidMount() {
    this.recalculatePositions();
  }

  componentDidUpdate(prevProps: HorizontalMenuGridLayoutProps) {
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
        getMenuItemBoundingRect: menuItemContext.getMenuItemBoundingRect,
      }),
    });
  }

  render() {
    const { menuContext, menuItemContext } = this.props;
    const { styles: stateStyles } = this.state;

    const { className, ...stylableProps } = style(
      'root',
      { expandSize: menuItemContext.expandSize },
      this.props,
    );
    const classList = classnames(className, menuContext.gridLayoutClassName);

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
            style.menuItem,
          ),
        }}
      >
        <div
          data-hook={HORIZONTAL_MENU_METADATA.dataHooks.gridLayout}
          data-layout="grid"
          data-opened={menuItemContext.isOpen}
          ref={this.layoutRef}
          className={classList}
          {...stylableProps}
          style={styles}
        >
          <ul className={style.listWrapper}>{this.props.children}</ul>
        </div>
      </HorizontalMenuContext.Provider>
    );
  }
}

export default withHorizontalMenuContext(
  withHorizontalMenuItemContext(HorizontalMenuGridLayout),
);
