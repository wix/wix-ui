import * as React from 'react';
import * as classnames from 'classnames';

import { HorizontalMenuContext } from '../HorizontalMenuContext';
import { HorizontalMenuItemContext } from '../horizontal-menu-item/HorizontalMenuItemContext';
import { layoutLeftAndRightPositions } from '../utils';

import style from './HorizontalMenuColumnsLayout.st.css';

export interface HorizontalMenuColumnsLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  textAlign?: 'left' | 'center' | 'right';
  columns?: number;
}

/** Horizontal Menu Column Layout */
export class HorizontalMenuColumnsLayout extends React.PureComponent<
  HorizontalMenuColumnsLayoutProps
> {
  static displayName = 'HorizontalMenuColumnsLayout';

  static defaultProps = {
    columns: 1,
  };

  render() {
    const { textAlign, columns } = this.props;

    const { className, ...stylableProps } = style('root', {}, this.props);

    return (
      <HorizontalMenuContext.Consumer>
        {context => {
          const classList = classnames(
            className,
            context.columnsLayoutClassName,
          );

          return (
            <HorizontalMenuItemContext.Consumer>
              {menuItemContext => {
                const { isOpen, expandSize } = menuItemContext;

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
                      data-hook="horizontal-menu-columns-layout"
                      data-layout="column"
                      data-opened={isOpen}
                      {...style('root', { expandSize }, this.props)}
                      className={classList}
                      {...stylableProps}
                      style={{
                        ...this.props.style,
                        textAlign,
                        columns,
                        ...layoutLeftAndRightPositions(menuItemContext),
                      }}
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
