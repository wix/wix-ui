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

<<<<<<< HEAD
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
=======
  id?: string;
}

/**
 * Input
 */
export class Input extends React.Component<InputProps> {
  static displayName = 'Input';

  private inputRef: HTMLInputElement;

  static defaultProps = {
    type: 'text',
    id: ''
  };

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
  }

  _onChange(e) {
    const {type, disabled, readOnly} = this.props;
>>>>>>> master

  state: InputState = {
    focus: false,
  };

  private input: HTMLInputElement;

  render() {
    return (
      <div
        {...style(
          'root',
          {disabled: this.props.disabled, error: this.props.error, focus: this.state.focus},
          this.props
        )}
      >
        {this.props.prefix}
        <input
          ref={input => this.input = input}
          autoComplete={this.props.autoComplete}
          autoFocus={this.props.autoFocus}
          disabled={this.props.disabled}
          onBlur={this.handleBlur}
          onChange={this.props.onChange}
          onFocus={this.handleFocus}
          onKeyDown={this.props.onKeyDown}
          onKeyPress={this.props.onKeyPress}
          onKeyUp={this.props.onKeyUp}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          required={this.props.required}
          tabIndex={this.props.tabIndex}
          type={this.props.type}
          value={this.props.value}
        />
        {this.props.suffix}
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

<<<<<<< HEAD
  private handleBlur: React.FocusEventHandler<HTMLElement> = event => {
    this.setState({focus: false});
    this.props.onBlur(event);
=======
  render() {
    const {
      disabled,
      autoComplete,
      autoFocus,
      name,
      onBlur,
      onFocus,
      onClick,
      onDoubleClick,
      onKeyDown,
      onKeyUp,
      placeholder,
      readOnly,
      required,
      tabIndex,
      type,
      value,
      id
    } = this.props;

    const ariaAttributes = createAriaAttributes(this.props);

    return (
      <input
        ref = {ref => this.inputRef = ref}
        {...style('root', {disabled}, this.props)}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        id={id}
        name={name}
        onChange={this._onChange}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        tabIndex={tabIndex}
        type={type}
        value={value}
        {...ariaAttributes}
      />
    );
>>>>>>> master
  }
}
