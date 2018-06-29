import * as React from 'react';
import * as PropTypes from 'prop-types';
import style from './Input.st.css';

export interface InputProps {
  className?: string;
  error?: string | boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;

  // Props passed down to the native input, add more as needed.
  // We cannot simply extend React.InputHTMLAttributes
  // because types of property 'prefix' are incompatible.
  autoComplete?: 'on' | 'off';
  autoFocus?: boolean;
  disabled?: boolean;
  maxLength?: number;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onClick?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onMouseDown?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onMouseUp?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onMouseMove?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onDragStart?: React.EventHandler<React.DragEvent<HTMLInputElement>>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  tabIndex?: number;
  type?: string;
  value?: string;
  id?: string;
  name?: string;
  style?: React.CSSProperties;
}

export interface InputState {
  focus: boolean;
}

export class Input extends React.Component<InputProps, InputState> {
  static displayName = 'Input';

  static propTypes = {
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
    const {focus} = this.state;
    const {
      error,
      disabled,
      prefix,
      autoComplete,
      autoFocus,
      onChange,
      onClick,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onDragStart,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      placeholder,
      readOnly,
      tabIndex,
      required,
      type,
      value,
      suffix,
      maxLength,
      id,
      name,
      style: inlineStyle
    } = this.props;

    return (
      <div
        {...style(
          'root',
          {disabled, error: !!error && !disabled, focus},
          this.props
        )}
        style={inlineStyle}
      >
        {prefix}
        <input
          ref={input => this.input = input}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          disabled={disabled}
          className={style.nativeInput}
          maxLength={maxLength}
          onBlur={this.handleBlur}
          onChange={onChange}
          onFocus={this.handleFocus}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onDragStart={onDragStart}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          tabIndex={tabIndex}
          type={type}
          value={value}
          id={id}
          name={name}
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
