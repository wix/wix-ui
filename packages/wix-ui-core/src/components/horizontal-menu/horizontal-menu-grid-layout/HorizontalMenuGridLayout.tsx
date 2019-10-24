import * as React from 'react';
import * as classnames from 'classnames';
import { HorizontalMenuContext } from '../HorizontalMenuContext';
import style from './HorizontalMenuGridLayout.st.css';

export interface HorizontalMenuGridLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  textAlign?: 'left' | 'center' | 'right';
}

/** Horizontal Menu Grid Layout */
export class HorizontalMenuGridLayout extends React.PureComponent<
  HorizontalMenuGridLayoutProps
> {
  static displayName = 'HorizontalMenuGridLayout';

  render() {
    const { textAlign } = this.props;
    const { className, ...stylableProps } = style('root', {}, this.props);

    return (
      <HorizontalMenuContext.Consumer>
        {context => {
          const classList = classnames(className, context.gridLayoutClassName);

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
                data-hook="horizontal-menu-grid-layout"
                data-layout="grid"
                {...style('root', {}, this.props)}
                className={classList}
                {...stylableProps}
                style={{ ...this.props.style, textAlign }}
              >
                {this.props.children}
              </ul>
            </HorizontalMenuContext.Provider>
          );
        }}
      </HorizontalMenuContext.Consumer>
    );
  }
}
