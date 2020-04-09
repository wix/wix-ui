import * as React from 'react';
import * as classnames from 'classnames';

import { HorizontalMenuContext } from '../HorizontalMenuContext';
import { HorizontalMenuItemContext } from './HorizontalMenuItemContext';
import { HORIZONTAL_MENU_METADATA } from '../constants';

import { style, classes } from './HorizontalMenuItem.st.css';

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
  showDelay?: number;
  hideDelay?: number;
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
    showDelay: 200,
    hideDelay: 200,
  };

  menuItemRef: React.RefObject<HTMLLIElement> = React.createRef();
  hideTimeout: any;
  showTimeout: any;

  // Wait 16.6 version and use this way
  // Wait 16.8 and use Hooks for contexts
  // https://ru.reactjs.org/blog/2018/10/23/react-v-16-6.html#static-contexttype
  // static contextType = HorizontalMenuContext;
  // context: React.ContextType<typeof HorizontalMenuContext>;

  state = {
    isOpen: false,
  };

  private readonly showMenu = () => {
    if (this.hideTimeout) {
      this.hideTimeout = clearTimeout(this.hideTimeout);
    }
    if (!this.state.isOpen) {
      this.showTimeout = setTimeout(() => {
        if (!this.hideTimeout) {
          this.setState({
            isOpen: true,
          });
        }
      }, this.props.showDelay);
    }
  };

  private readonly hideMenu = () => {
    this.hideTimeout = setTimeout(() => {
      if (this.showTimeout) {
        this.showTimeout = clearTimeout(this.showTimeout);
      }
      this.setState({
        isOpen: false,
      });
    }, this.props.hideDelay);
  };

  private renderExpandIcon() {
    const { expandIcon, isForceOpened } = this.props;

    if (!this.props.children || !expandIcon) {
      return null;
    }

    const { isOpen: isOpenState } = this.state;
    const isOpen = isOpenState || isForceOpened;

    return <span className={classes.expandIcon}>{expandIcon({ isOpen })}</span>;
  }

  private renderLink() {
    const { href, target, icon, label } = this.props;
    return (
      <div className={classes.linkContainer}>
        {icon}
        <a
          className={classes.menuItemLink}
          data-hook={HORIZONTAL_MENU_METADATA.dataHooks.itemLink}
          href={href}
          target={target}
          tabIndex={0}
        >
          {label}
        </a>
        {this.renderExpandIcon()}
        <div className={classes.divider} />
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
      hideDelay,
      showDelay,
      ...rest
    } = this.props;

    const { isOpen: isOpenState } = this.state;

    const isOpen = isOpenState || isForceOpened;

    return (
      <HorizontalMenuContext.Consumer>
        {menuContext => {
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
                    onMouseEnter={this.showMenu}
                    onMouseLeave={this.hideMenu}
                    onFocus={this.showMenu}
                    onBlur={this.hideMenu}
                    data-hook={HORIZONTAL_MENU_METADATA.dataHooks.item}
                    ref={this.menuItemRef}
                    className={classnames(
                      menuContext.menuItemClassName,
                      style(classes.root, { expandSize }, this.props.className),
                    )}
                    style={propStyle}
                    {...rest}
                  >
                    {this.renderLink()}
                    <HorizontalMenuItemContext.Provider
                      value={{
                        isOpen: isMenuOpen,
                        expandSize,
                        rootMenuRef: menuContext.rootMenuRef,
                        menuItemRef: this.menuItemRef,
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
