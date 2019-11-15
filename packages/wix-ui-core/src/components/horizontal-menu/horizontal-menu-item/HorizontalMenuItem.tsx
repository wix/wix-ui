import * as React from 'react';
import * as classnames from 'classnames';

import { HorizontalMenuContext } from '../HorizontalMenuContext';
import { HorizontalMenuItemContext } from './HorizontalMenuItemContext';
import { HORIZONTAL_MENU_METADATA } from '../constants';

import style from './HorizontalMenuItem.st.css';

export type ExpandSize = 'column' | 'menu' | 'fullWidth';

export interface ExpandIconProps {
  isOpen: boolean;
}

export interface HorizontalMenuItemProps {
  label: string;
  className?: string;
  href?: string;
  target?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  expandSize?: ExpandSize;
  expandIcon?(props: ExpandIconProps): React.ReactNode;
}

interface HorizontalMenuItemState {
  isOpen: boolean;
}

export class HorizontalMenuItem extends React.PureComponent<
  HorizontalMenuItemProps,
  HorizontalMenuItemState
> {
  static displayName = HORIZONTAL_MENU_METADATA.displayNames.item;

  static defaultProps = {
    href: '#',
    target: '_self',
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

    return <span className={style.expandIcon}>{expandIcon({ isOpen })}</span>;
  }

  render() {
    const {
      label,
      href,
      target,
      expandSize,
      children,
      className: propClassName,
      icon,
      expandIcon,
      style: propStyle,
      ...rest
    } = this.props;

    const { isOpen } = this.state;

    const { className, ...stylableProps } = style('root', {}, this.props);

    return (
      <HorizontalMenuContext.Consumer>
        {menuContext => {
          const classList = classnames(
            className,
            menuContext.menuItemClassName,
          );

          return (
            <HorizontalMenuItemContext.Consumer>
              {menuItemContext => {
                const isMenuOpen = menuItemContext.isOpen || isOpen;

                return (
                  <li
                    aria-selected={isOpen}
                    aria-expanded={children && isMenuOpen}
                    aria-haspopup={children ? 'menu' : undefined}
                    aria-label={label}
                    onMouseEnter={this.toggleMenu}
                    onMouseLeave={this.toggleMenu}
                    onFocus={this.toggleMenu}
                    onBlur={this.toggleMenu}
                    menu-item-label={label}
                    data-hook={HORIZONTAL_MENU_METADATA.dataHooks.item}
                    ref={this.menuItemRef}
                    className={classList}
                    {...stylableProps}
                    style={propStyle}
                    {...rest}
                  >
                    <a
                      className={style.menuItemLink}
                      data-hook={HORIZONTAL_MENU_METADATA.dataHooks.itemLink}
                      href={href}
                      target={target}
                    >
                      {icon}
                      {label}
                      {this.renderExpandIcon()}
                    </a>
                    <HorizontalMenuItemContext.Provider
                      value={{
                        expandSize,
                        isOpen: isMenuOpen,
                        getMenuBoundingRect: menuContext.getMenuBoundingRect,
                        getMenuItemOffsetLeft: this.getMenuItemOffsetLeft,
                        getMenuItemBoundingRect: this.getMenuItemBoundingRect,
                      }}
                    >
                      {children}
                    </HorizontalMenuItemContext.Provider>
                  </li>
                );
              }}
            </HorizontalMenuItemContext.Consumer>
          );
        }}
      </HorizontalMenuContext.Consumer>
    );
  }
}
