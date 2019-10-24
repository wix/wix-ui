import * as React from 'react';
import * as classnames from 'classnames';
import {
  HorizontalMenuContext,
  HorizontalMenuContextValue,
} from '../HorizontalMenuContext';

import style from './HorizontalMenuItem.st.css';

export interface ExpandIconProps {
  isOpen: boolean;
}

export interface HorizontalMenuItemProps {
  className?: string;
  href?: string;
  title: React.ReactNode;
  expandIcon?(props: ExpandIconProps): React.ReactElement;
  expandSize?: 'column' | 'menu' | 'fullWidth';
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

  calculateLeftAndRightPositions(context: HorizontalMenuContextValue) {
    const { current } = this.menuItemRef;

    if (!current) {
      return { left: 0, right: 0 };
    }

    const { expandSize } = this.props;

    const itemWidth = current.getBoundingClientRect().width;

    if (expandSize === 'menu') {
      const offsetLeft = current.offsetLeft;
      const menuWidth = context.getMenuBoundingRect('width');

      return {
        left: -offsetLeft,
        right: -(menuWidth - itemWidth - offsetLeft),
      };
    }

    const left = current.getBoundingClientRect().left;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const right = window.innerWidth - scrollbarWidth - left - itemWidth;

    return { left: -left, right: -right };
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
              {expandSize !== 'column' ? (
                <div
                  className={style.expandMenu}
                  style={{
                    ...this.calculateLeftAndRightPositions(context),
                  }}
                >
                  {children}
                </div>
              ) : (
                children
              )}
            </li>
          );
        }}
      </HorizontalMenuContext.Consumer>
    );
  }
}
