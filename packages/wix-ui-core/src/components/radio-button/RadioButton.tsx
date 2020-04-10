import * as React from 'react';
import { style, classes } from './RadioButton.st.css';

const noop = () => null;

export interface RadioButtonChangeEvent
  extends React.MouseEvent<HTMLDivElement> {
  value: string;
}

export interface RadioButtonClickEvent
  extends React.MouseEvent<HTMLDivElement> {
  value: string;
}

export interface RadioButtonKeyDownEvent
  extends React.KeyboardEvent<HTMLInputElement> {
  value: string;
}

export interface RadioButtonHoverEvent
  extends React.MouseEvent<HTMLSpanElement> {
  value: string;
}

export interface RadioButtonProps {
  /** Sets checked status of the radio */
  checked?: boolean;
  /** The value which the radio represents */
  value?: string;
  /** The group name which the button belongs to */
  name?: string;
  /** A callback to invoke on change */
  onChange?(event: RadioButtonChangeEvent | RadioButtonClickEvent): void;
  /** A callback to invoke on keydown */
  onKeyDown?(event: RadioButtonKeyDownEvent): void;
  /** A callback to invoke on hover */
  onHover?(event: RadioButtonHoverEvent): void;
  /** A callback to invoke on blur */
  onIconBlur?(event: React.MouseEvent<HTMLElement>): void;
  /** The checked icon */
  checkedIcon?: React.ReactNode;
  /** The unchecked icon */
  uncheckedIcon?: React.ReactNode;
  /** The label */
  label?: React.ReactNode;
  /** Sets the disabled status of the radio */
  disabled?: boolean;
  /** Sets the tabindex to the input */
  tabIndex?: number;
  /** Sets the required status of the radio */
  required?: boolean;
  /** aria-label - Accessibility */
  'aria-label'?: string;
}

export interface RadioButtonState {
  focused: boolean;
  focusVisible: boolean;
}

export class RadioButton extends React.Component<
  RadioButtonProps,
  RadioButtonState
> {
  static displayName = 'RadioButton';

  private focusedByMouse: boolean = false;
  static bypassDefaultPropsTypecheck;
  state = {
    focused: false,
    focusVisible: false,
  };

  static defaultProps = {
    onChange: noop,
    onKeyDown: noop,
    onHover: noop,
    onBlur: noop,
  };

  render() {
    const {
      value,
      name,
      checkedIcon,
      uncheckedIcon,
      label,
      checked,
      disabled,
      required,
      onIconBlur,
      tabIndex,
    } = this.props;
    const focused = this.state.focused;

    return (
      <div
        className={style(classes.root, {
          checked,
          disabled,
          focused,
          'focus-visible': this.state.focusVisible,
        })}
        onChange={this.handleInputChange}
        onClick={this.handleClick}
        role="radio"
        aria-checked={checked ? checked : false}
      >
        <input
          type="radio"
          className={classes.hiddenRadio}
          disabled={disabled}
          required={required}
          onFocus={this.onFocus}
          onBlur={this.onInputBlur}
          checked={checked}
          value={value}
          name={name}
          tabIndex={tabIndex}
          onChange={() => null}
          onKeyDown={this.handleInputKeyDown}
          ref={radio => (this.radioRef = radio)}
          aria-label={this.props['aria-label']}
        />
        <span
          className={classes.icon}
          onMouseEnter={this.onHover}
          onMouseLeave={onIconBlur}
        >
          {checked ? checkedIcon : uncheckedIcon}
        </span>
        <span className={classes.label}>{label}</span>
      </div>
    );
  }

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.focusedByMouse = true;
    this.handleInputChange(event);
  };

  handleInputChange = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.props.disabled) {
      this.props.onChange({ value: this.props.value, ...event });
      if (this.radioRef) {
        this.radioRef.focus();
      }
    }
  };

  onHover = (event: React.MouseEvent<HTMLSpanElement>) => {
    this.props.onHover({ value: this.props.value, ...event });
  };

  onFocus = () => {
    this.setState({ focused: true, focusVisible: !this.focusedByMouse });
  };

  onInputBlur = () => {
    this.setState({ focused: false, focusVisible: false });
    this.focusedByMouse = false;
  };

  handleInputKeyDown = (event: RadioButtonKeyDownEvent) => {
    this.setState({ focusVisible: true });
    if (!this.props.disabled) {
      this.props.onKeyDown({ value: this.props.value, ...event });
    }
  };

  private radioRef = undefined;
}
