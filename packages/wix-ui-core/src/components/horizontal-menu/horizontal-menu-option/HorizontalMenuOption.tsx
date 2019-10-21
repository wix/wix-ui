import * as React from 'react';

import styles from './HorizontalMenuOption.st.css';

export interface HorizontalMenuOptionProps {
  text: string;
  href?: string;
  target?: string;
  style?: React.CSSProperties;
}

/** Horizontal Menu Option */
export class HorizontalMenuOption extends React.PureComponent<
  HorizontalMenuOptionProps
> {
  static displayName = 'HorizontalMenuOption';

  static defaultProps = {
    href: '#',
    target: '_self',
  };

  render() {
    const { text, href, target } = this.props;

    return (
      <li
        {...styles('root', {}, this.props)}
        data-hook="horizontal-menu-option"
        style={this.props.style}
      >
        <a
          href={href}
          target={target}
          data-hook="horizontal-menu-option-link"
          className={styles.link}
          aria-label={text}
        >
          {text}
        </a>
      </li>
    );
  }
}
