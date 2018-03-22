import * as React from 'react';
import * as PropTypes from 'prop-types';
import style from './Input.st.css';

export interface InputProps {
  className?: string;
  error?: boolean;
  prefix?: JSX.Element;
  suffix?: JSX.Element;

  // Props passed down to the native input, add more as needed.
  // We cannot simply extend React.InputHTMLAttributes
  // because types of property 'prefix' are incompatible.

  autoComplete?: 'on' | 'off';
  autoFocus?: boolean;
  disabled?: boolean;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  tabIndex?: number;
  type?: string;
  value?: string;
}

export interface InputState {
  focus: boolean;
}

export class Input extends React.Component<InputProps, InputState> {
  static propTypes = {
    /** Wrapper class name */
    className: PropTypes.string,
    /** Error state */
    error: PropTypes.bool,
    /** Prefix */
    prefix: PropTypes.node,
    /** Suffix */
    suffix: PropTypes.node,

    autoComplete: PropTypes.oneOf(['on', 'off']),
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    tabIndex: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.string
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
    const {focus} = this.state;
    const {
      error,
      disabled,
      prefix,
      autoComplete,
      autoFocus,
      onChange,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      placeholder,
      readOnly,
      tabIndex,
      required,
      type,
      value,
      suffix
    } = this.props;

    return (
      <div
        {...style(
          'root',
          {disabled, error, focus},
          this.props
        )}
      >
        {prefix}
        <input
          ref={input => this.input = input}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          disabled={disabled}
          className={style.nativeInput}
          onBlur={this.handleBlur}
          onChange={onChange}
          onFocus={this.handleFocus}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          tabIndex={tabIndex}
          type={type}
          value={value}
        />
        {suffix}
      </div>
    );
  }

  focus() { this.input.focus(); }
  blur() { this.input.blur(); }
  select() { this.input.select(); }

  private handleFocus: React.FocusEventHandler<HTMLElement> = event => {
    this.setState({focus: true});
    this.props.onFocus(event);
  }

  private handleBlur: React.FocusEventHandler<HTMLElement> = event => {
    this.setState({focus: false});
    this.props.onBlur(event);
  }
}
