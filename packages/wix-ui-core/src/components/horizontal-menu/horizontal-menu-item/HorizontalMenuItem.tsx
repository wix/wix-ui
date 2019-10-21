import * as React from 'react';

import { HorizontalMenuItemSubmenu as Submenu } from '../horizontal-menu-item-submenu';

import styles from './HorizontalMenuItem.st.css';

export interface HorizontalMenuItemProps {
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch';
  className?: string;
  href?: string;
  title: string;
  submenuSize?: 'column' | 'menu';
  style?: React.CSSProperties;
}

interface HorizontalMenuItemState {
  isHovered: boolean;
}

export class HorizontalMenuItem extends React.PureComponent<
  HorizontalMenuItemProps,
  HorizontalMenuItemState
> {
  static displayName = 'HorizontalMenuItem';

  static defaultProps = {
    alignItems: 'center',
    href: '#',
    submenuSize: 'column',
  };

  state = {
    isHovered: false,
  };

  onMouseEnterHandler = () => {
    this.setState({
      isHovered: true,
    });
  };

  onMouseLeaveHandler = () => {
    this.setState({
      isHovered: false,
    });
  };

  render() {
    const { title, href, children, submenuSize, alignItems } = this.props;

    const { isHovered } = this.state;

    return (
      <li
        {...styles('root', { submenuSize }, this.props)}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
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
        {isHovered && <Submenu style={{ alignItems }}>{children}</Submenu>}
      </li>
    );
  }
}
