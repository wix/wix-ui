import * as React from 'react';
import * as classnames from 'classnames';
import { HorizontalMenuContext } from '../HorizontalMenuContext';

import style from './HorizontalMenuItem.st.css';
import { HorizontalMenuItemContext } from './HorizontalMenuItemContext';

export type ExpandSize = 'column' | 'menu' | 'fullWidth';

export interface ExpandIconProps {
  isOpen: boolean;
}

export interface HorizontalMenuItemProps {
  className?: string;
  href?: string;
  title: React.ReactNode;
  expandIcon?(props: ExpandIconProps): React.ReactElement;
  expandSize?: ExpandSize;
  style?: React.CSSProperties;
}

interface HorizontalMenuItemState {
  isOpen: boolean;
}

export class HorizontalMenuItem extends React.PureComponent<
  HorizontalMenuItemProps,
  HorizontalMenuItemState
> {
  static displayName = 'HorizontalMenuItem';

  static defaultProps = {
    href: '#',
    expandSize: 'column',
  };

  menuItemRef: React.RefObject<HTMLLIElement> = React.createRef();

  // Wait 16.6 version and use this way
  // Wait 16.8 and use Hooks for contexts
  // https://ru.reactjs.org/blog/2018/10/23/react-v-16-6.html#static-contexttype
  // static contextType = HorizontalMenuContext;
  // context: React.ContextType<typeof HorizontalMenuContext>;

  state = {
    isOpen: false,
  };

  private readonly getMenuItemBoundingRect = (key: string) => {
    const { current } = this.menuItemRef;

    if (!current) {
      return 0;
    }

    return current.getBoundingClientRect()[key];
  };

  private readonly getMenuItemOffsetLeft = () => {
    const { current } = this.menuItemRef;

    if (!current) {
      return 0;
    }

    return current.offsetLeft;
  };

  private readonly toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  private renderExpandIcon() {
    const { expandIcon } = this.props;

    if (!this.props.children || !expandIcon) {
      return null;
    }

    const { isOpen } = this.state;

    return expandIcon({ isOpen });
  }

  render() {
    const {
      title,
      href,
      expandSize,
      children,
      className: propClassName,
      expandIcon,
      style: propStyle,
      ...rest
    } = this.props;

    const { isOpen } = this.state;

    const { className, ...stylableProps } = style('root', {}, this.props);

    return (
      <HorizontalMenuContext.Consumer>
        {context => {
          const classList = classnames(className, context.menuItemClassName);

          return (
            <li
              aria-selected={isOpen}
              aria-expanded={children && isOpen}
              aria-haspopup={children ? 'menu' : undefined}
              onMouseEnter={this.toggleMenu}
              onMouseLeave={this.toggleMenu}
              onFocus={this.toggleMenu}
              onBlur={this.toggleMenu}
              menu-item-title={title}
              data-hook="horizontal-menu-item"
              ref={this.menuItemRef}
              className={classList}
              {...stylableProps}
              style={propStyle}
              {...rest}
            >
              <a
                className={style.menuItemLink}
                data-hook="horizontal-menu-item-link"
                href={href}
              >
                {title}
              </a>
              {this.renderExpandIcon()}
              <HorizontalMenuItemContext.Provider
                value={{
                  isOpen,
                  expandSize,
                  getMenuBoundingRect: context.getMenuBoundingRect,
                  getMenuItemOffsetLeft: this.getMenuItemOffsetLeft,
                  getMenuItemBoundingRect: this.getMenuItemBoundingRect,
                }}
              >
                {children}
              </HorizontalMenuItemContext.Provider>
            </li>
          );
        }}
      </HorizontalMenuContext.Consumer>
    );
  }
}
