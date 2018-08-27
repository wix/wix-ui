import * as PropTypes from 'prop-types';
import * as React from 'react';
import style from './Input.st.css';
const omit = require('lodash/omit');
import {Omit} from 'type-zoo';

const ommitedInputProps = ['style', 'error'];
type OmittedInputProps = 'value' | 'prefix'
export type AriaAutoCompleteType = 'list' | 'none' | 'both';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, OmittedInputProps> {
  className?: string;
  error?: string | boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onClick?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onMouseDown?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onMouseUp?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onMouseMove?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onDragStart?: React.EventHandler<React.DragEvent<HTMLInputElement>>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  'aria-autocomplete'?: AriaAutoCompleteType
}

export interface InputState {
  focus: boolean;
}

export class Input extends React.Component<InputProps, InputState> {
  static displayName = 'Input';

  static propTypes: React.ValidationMap<InputProps> = {
    /** Wrapper class name */
    className: PropTypes.string,
    /** Error state / Error message */
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /** Prefix */
    prefix: PropTypes.node,
    /** Suffix */
    suffix: PropTypes.node,

    autoComplete: PropTypes.oneOf(['on', 'off']),
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseMove: PropTypes.func,
    onDragStart: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    tabIndex: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps: InputProps = {
    type: 'text',
    onFocus: () => null,
    onBlur: () => null,
    onChange: () => null
  };

  state: InputState = {
    focus: false,
  };

  private input: HTMLInputElement;

  render() {
    const { focus } = this.state;
    const {
      error,
      disabled,
      prefix,
      suffix,
      style: inlineStyle
    } = this.props;

    return (
      <div
        {...style(
          'root',
          { disabled, error: !!error && !disabled, focus },
          this.props
        )}
        style={inlineStyle}
      >
        {prefix}
        <input
          {...omit(this.props, ommitedInputProps)}
          ref={input => this.input = input}
          className={style.nativeInput}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        {suffix}
      </div>
    );
  }

  focus() { this.input.focus(); }
  blur() { this.input.blur(); }
  select() { this.input.select(); }
  getSelectionStart() { return this.input.selectionStart; }
  getSelectionEnd() { return this.input.selectionEnd; }
  setSelectionRange(start: number, end: number) { this.input.setSelectionRange(start, end); }

  private handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
    this.setState({ focus: true });
    this.props.onFocus(event);
  }

  private handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    this.setState({ focus: false });
    this.props.onBlur(event);
  }
}
