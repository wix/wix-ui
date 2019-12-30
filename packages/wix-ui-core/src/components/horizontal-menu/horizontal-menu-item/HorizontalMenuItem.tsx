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
  isForceOpened?: boolean;
  expandSize?: ExpandSize;
  style?: React.CSSProperties;
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
    isForceOpened: false,
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

  private readonly toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  private renderExpandIcon() {
    const { expandIcon, isForceOpened } = this.props;

    if (!this.props.children || !expandIcon) {
      return null;
    }

    const { isOpen: isOpenState } = this.state;
    const isOpen = isOpenState || isForceOpened;

    return <span className={style.expandIcon}>{expandIcon({ isOpen })}</span>;
  }

  private renderLink() {
    const { href, target, icon, label } = this.props;
    return (
      <div className={style.linkContainer}>
        {icon}
        <a
          className={style.menuItemLink}
          data-hook={HORIZONTAL_MENU_METADATA.dataHooks.itemLink}
          href={href}
          target={target}
          tabIndex={0}
        >
          {label}
        </a>
        {this.renderExpandIcon()}
        <div className={style.divider} />
      </div>
    );
  }

  render() {
    const {
      label,
      href,
      target,
      children,
      className: propClassName,
      icon,
      expandIcon,
      expandSize,
      style: propStyle,
      isForceOpened,
      ...rest
    } = this.props;

    const { isOpen: isOpenState } = this.state;

    const { className, ...stylableProps } = style(
      'root',
      { expandSize },
      this.props,
    );

    const isOpen = isOpenState || isForceOpened;

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
                    aria-haspopup={children ? true : false}
                    aria-label={label}
                    onMouseEnter={this.toggleMenu}
                    onMouseLeave={this.toggleMenu}
                    onFocus={this.toggleMenu}
                    onBlur={this.toggleMenu}
                    data-hook={HORIZONTAL_MENU_METADATA.dataHooks.item}
                    ref={this.menuItemRef}
                    className={classList}
                    {...stylableProps}
                    style={propStyle}
                    {...rest}
                  >
                    {this.renderLink()}
                    <HorizontalMenuItemContext.Provider
                      value={{
                        isOpen: isMenuOpen,
                        expandSize,
                        getMenuBoundingRect: menuContext.getMenuBoundingRect,
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
