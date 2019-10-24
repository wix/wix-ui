import * as React from 'react';
import * as classnames from 'classnames';
import { HorizontalMenuContext } from '../HorizontalMenuContext';

import style from './HorizontalMenuItem.st.css';

export interface HorizontalMenuItemProps {
  className?: string;
  href?: string;
  title: React.ReactNode;
  expandOpenIcon?: React.ReactNode;
  expandCloseIcon?: React.ReactNode;
  expandableSize?: 'column' | 'menu';
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
    expandableSize: 'column',
  };

  // Wait 16.6 version and use this way
  // Wait 16.8 and use Hooks for contexts
  // https://ru.reactjs.org/blog/2018/10/23/react-v-16-6.html#static-contexttype
  // static contextType = HorizontalMenuContext;
  // context: React.ContextType<typeof HorizontalMenuContext>;

  state = {
    isOpen: false,
  };

  _onMouseEnterHandler = () => {
    this.setState({
      isOpen: true,
    });
  };

  _onMouseLeaveHandler = () => {
    this.setState({
      isOpen: false,
    });
  };

  _renderExpandIcon() {
    const { expandOpenIcon, expandCloseIcon } = this.props;

    if (!expandOpenIcon || !expandCloseIcon || !this.props.children) {
      return null;
    }

    return (
      <div className={style.expandIcon}>
        {this.state.isOpen ? expandCloseIcon : expandOpenIcon}
      </div>
    );
  }

  render() {
    const { title, href, expandableSize, children } = this.props;
    const { isOpen } = this.state;

    const { className, ...stylableProps } = style(
      'root',
      { expandableSize },
      this.props,
    );

    return (
      <HorizontalMenuContext.Consumer>
        {context => {
          const classList = classnames(className, context.menuItemClassName);

          return (
            <li
              onMouseEnter={this._onMouseEnterHandler}
              onMouseLeave={this._onMouseLeaveHandler}
              menu-item-title={title}
              data-hook="horizontal-menu-item"
              className={classList}
              {...stylableProps}
              style={this.props.style}
            >
              <a
                className={style.menuItemLink}
                data-hook="horizontal-menu-item-link"
                href={href}
              >
                {title}
              </a>
              {this._renderExpandIcon()}
              {isOpen && children}
            </li>
          );
        }}
      </HorizontalMenuContext.Consumer>
    );
  }
}
