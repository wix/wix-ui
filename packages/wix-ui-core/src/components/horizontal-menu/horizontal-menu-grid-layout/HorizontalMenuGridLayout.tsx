import * as React from 'react';
import * as classnames from 'classnames';

import { HorizontalMenuContext } from '../HorizontalMenuContext';
import { HorizontalMenuItemContext } from '../horizontal-menu-item/HorizontalMenuItemContext';
import { layoutLeftAndRightPositions } from '../utils';
import { HORIZONTAL_MENU_METADATA } from '../constants';

import style from './HorizontalMenuGridLayout.st.css';

export interface HorizontalMenuGridLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  textAlign?: 'left' | 'center' | 'right';
  maxOverflowWidth?: number;
}

/** Horizontal Menu Grid Layout */
export class HorizontalMenuGridLayout extends React.PureComponent<
  HorizontalMenuGridLayoutProps
> {
  static displayName = HORIZONTAL_MENU_METADATA.displayNames.gridLayout;

  layoutRef: React.RefObject<HTMLUListElement> = React.createRef();

  render() {
    const { textAlign, maxOverflowWidth } = this.props;
    const { className, ...stylableProps } = style('root', {}, this.props);

    return (
      <HorizontalMenuContext.Consumer>
        {context => {
          const classList = classnames(className, context.gridLayoutClassName);

          /**
           * pass contexts as prop to NEW component to prevent object creating for each render
           */
          return (
            <HorizontalMenuItemContext.Consumer>
              {menuItemContext => {
                const { isOpen, expandSize } = menuItemContext;

                const styles = {
                  ...this.props.style,
                  textAlign,
                  ...layoutLeftAndRightPositions(
                    menuItemContext,
                    this.layoutRef,
                    maxOverflowWidth,
                  ),
                };

                return (
                  <HorizontalMenuContext.Provider
                    value={{
                      ...context,
                      menuItemClassName: classnames(
                        context.menuItemClassName,
                        style.menuItem,
                      ),
                    }}
                  >
                    <ul
                      data-hook={HORIZONTAL_MENU_METADATA.dataHooks.gridLayout}
                      data-layout="grid"
                      data-opened={isOpen}
                      ref={this.layoutRef}
                      {...style('root', { expandSize }, this.props)}
                      className={classList}
                      {...stylableProps}
                      style={styles}
                    >
                      {this.props.children}
                    </ul>
                  </HorizontalMenuContext.Provider>
                );
              }}
            </HorizontalMenuItemContext.Consumer>
          );
        }}
      </HorizontalMenuContext.Consumer>
    );
  }
}
