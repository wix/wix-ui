import * as React from 'react';
import * as PropTypes from 'prop-types';
import style from './Input.st.css';

// type ExcludedProperties = 
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'prefix'> {
  className?: string;
  error?: string | boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value?: string;
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

  private handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
    this.setState({focus: true});
    this.props.onFocus(event);
  }

  private handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    this.setState({focus: false});
    this.props.onBlur(event);
  }
}
