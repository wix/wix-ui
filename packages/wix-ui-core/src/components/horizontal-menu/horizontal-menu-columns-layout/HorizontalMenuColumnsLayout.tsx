import * as React from 'react';
import * as classnames from 'classnames';

import { withHorizontalMenuLayout } from '../horizontal-menu-layout';
import { HorizontalMenuLayout } from '../horizontal-menu-layout/HorizontalMenuLayout';
import { HorizontalMenuContext } from '../HorizontalMenuContext';
import { HORIZONTAL_MENU_METADATA } from '../constants';

import style from './HorizontalMenuColumnsLayout.st.css';

export interface HorizontalMenuColumnsLayoutProps {
  columns?: number;
}

/** Horizontal Menu Column Layout */
export class HorizontalMenuColumnsLayout extends HorizontalMenuLayout<
  HorizontalMenuColumnsLayoutProps
> {
  static displayName = HORIZONTAL_MENU_METADATA.displayNames.columnsLayout;

  static defaultProps = {
    columns: 1,
  };

  render() {
    const { textAlign, menuContext, isOpen, expandSize, columns } = this.props;
    const { styles: stateStyles } = this.state;

    const { className, ...stylableProps } = style(
      'root',
      { expandSize },
      this.props,
    );
    const classList = classnames(className, menuContext.columnsLayoutClassName);

    const styles = {
      ...this.props.style,
      textAlign,
      columns,
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
          data-hook={HORIZONTAL_MENU_METADATA.dataHooks.columnsLayout}
          data-layout="column"
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

export default withHorizontalMenuLayout<HorizontalMenuColumnsLayoutProps>(
  HorizontalMenuColumnsLayout,
);
