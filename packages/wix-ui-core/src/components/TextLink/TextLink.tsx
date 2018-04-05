import * as React from 'react';
import * as PropTypes from 'prop-types';
import style from './TextLink.st.css';
import {Text} from '../Text/index';
import {createHOC} from '../../createHOC';

export interface TextLinkProps {
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  children?: React.ReactNode;
}

export interface TextLinkState {
  focus: boolean;
}

export class TextLink extends React.Component<TextLinkProps, TextLinkState> {
  static propTypes = {
    /** Makes the link disabled */
    disabled: PropTypes.bool,
    /** Standard anchor href property */
    href: PropTypes.string,
    /** Standard anchor target property */
    target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
    /** Any node to be rendered (usually text node) */
    children: PropTypes.any,
  };

  static defaultProps = {
    target: '_self',
    disabled: false
  };

  state: TextLinkState = {
    focus: false,
  };

  render() {
    const {focus} = this.state;
    const {href, disabled, target, children} = this.props;

    return (
      <a
        href={disabled ? 'javascript:void(0);' : href}
        target={target}
        {...style(
          'root',
          {disabled, focus},
          this.props
        )}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {children}
      </a>
    );
  }

  private handleFocus: React.FocusEventHandler<HTMLElement> = event => {
    this.setState({focus: true});
  }

  private handleBlur: React.FocusEventHandler<HTMLElement> = event => {
    this.setState({focus: false});
  }
}
