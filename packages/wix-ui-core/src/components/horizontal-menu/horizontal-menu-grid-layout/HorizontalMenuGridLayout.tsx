import * as React from 'react';
import * as classnames from 'classnames';

import { withHorizontalMenuLayout } from '../horizontal-menu-layout';
import { HorizontalMenuLayout } from '../horizontal-menu-layout/HorizontalMenuLayout';
import { HorizontalMenuContext } from '../HorizontalMenuContext';
import { HORIZONTAL_MENU_METADATA } from '../constants';

import style from './HorizontalMenuGridLayout.st.css';

export interface HorizontalMenuGridLayoutProps {}

/** Horizontal Menu Grid Layout */
export class HorizontalMenuGridLayout extends HorizontalMenuLayout<
  HorizontalMenuGridLayoutProps
> {
  static displayName = HORIZONTAL_MENU_METADATA.displayNames.gridLayout;

  render() {
    const { textAlign, menuContext, isOpen, menuItemContext } = this.props;
    const { styles: stateStyles } = this.state;

    const { className, ...stylableProps } = style(
      'root',
      { expandSize: menuItemContext.expandSize },
      this.props,
    );
    const classList = classnames(className, menuContext.gridLayoutClassName);

    const styles = {
      ...this.props.style,
      textAlign,
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
        <ul
          data-hook={HORIZONTAL_MENU_METADATA.dataHooks.gridLayout}
          data-layout="grid"
          data-opened={isOpen}
          ref={this.layoutRef}
          className={classList}
          {...stylableProps}
          style={styles}
        >
          {this.props.children}
        </ul>
      </HorizontalMenuContext.Provider>
    );
  }
}

export default withHorizontalMenuLayout<HorizontalMenuGridLayoutProps>(
  HorizontalMenuGridLayout,
);
