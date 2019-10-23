import * as React from 'react';

import styles from './HorizontalMenuItem.st.css';

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
      <div className={styles.expandIcon}>
        {this.state.isOpen ? expandCloseIcon : expandOpenIcon}
      </div>
    );
  }

  render() {
    const { title, href, expandableSize, children } = this.props;
    const { isOpen } = this.state;

    return (
      <li
        {...styles('root', { expandableSize }, this.props)}
        onMouseEnter={this._onMouseEnterHandler}
        onMouseLeave={this._onMouseLeaveHandler}
        data-hook="horizontal-menu-item"
        menu-item-title={title}
        style={this.props.style}
      >
        <a
          className={styles.menuItemLink}
          data-hook="horizontal-menu-item-link"
          href={href}
        >
          {title}
        </a>
        {this._renderExpandIcon()}
        {isOpen && children}
      </li>
    );
  }
}
