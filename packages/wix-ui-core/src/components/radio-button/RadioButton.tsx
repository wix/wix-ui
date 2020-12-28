import * as React from 'react';
import { st, classes } from './RadioButton.st.css';
import { filterDataProps } from '../../utils/filter-data-props';
import { dataHooks } from './constants';
import { generateDataAttr } from '../../utils/generateDataAttr';

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
  /** The button id */
  id?: string;
  /** A callback to invoke on change */
  onChange?(event: RadioButtonChangeEvent | RadioButtonClickEvent): void;
  /** A callback to invoke on keydown */
  onKeyDown?(event: RadioButtonKeyDownEvent): void;
  /** A callback to invoke on hover */
  onHover?(event: RadioButtonHoverEvent): void;
  /** A callback to invoke on blur */
  onIconBlur?(event: React.MouseEvent<HTMLElement>): void;
  /** A callback to invoke on focus */
  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
  /** A callback to invoke on focus fired from keyboard event */
  onFocusByKeyboard?(event: React.FocusEvent<HTMLInputElement>): void;
  /** A callback to invoke on blur */
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
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
  /** hook for testing purposes */
  'data-hook'?: string;
  className?: string;
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
      id,
      checkedIcon,
      uncheckedIcon,
      label,
      checked,
      disabled,
      required,
      onIconBlur,
      tabIndex,
      className,
    } = this.props;
    const focused = this.state.focused;

    return (
      <div
        className={st(
          classes.root,
          {
            checked,
            disabled,
            focused,
            'focus-visible': this.state.focusVisible,
          },
          className,
        )}
        {...generateDataAttr(this.props, ['checked', 'disabled', 'required'])}
        data-focused={focused}
        data-focus-visible={this.state.focusVisible}
        onChange={this.handleInputChange}
        onClick={this.handleClick}
        role="radio"
        aria-checked={checked ? checked : false}
        {...filterDataProps(this.props)}
      >
        <input
          type="radio"
          className={classes.hiddenRadio}
          data-hook={dataHooks.hiddenRadio}
          disabled={disabled}
          required={required}
          onFocus={this.onFocus}
          onBlur={this.onInputBlur}
          checked={checked}
          value={value}
          name={name}
          id={id}
          tabIndex={tabIndex}
          onChange={() => null}
          onKeyDown={this.handleInputKeyDown}
          ref={radio => (this.radioRef = radio)}
          aria-label={this.props['aria-label']}
        />
        <span
          className={classes.icon}
          data-hook={dataHooks.icon}
          onMouseEnter={this.onHover}
          onMouseLeave={onIconBlur}
        >
          {checked ? checkedIcon : uncheckedIcon}
        </span>
        <span className={classes.label} data-hook={dataHooks.label}>
          {label}
        </span>
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

  onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    !this.focusedByMouse &&
      this.props.onFocusByKeyboard &&
      this.props.onFocusByKeyboard(event);
    this.setState({ focused: true, focusVisible: !this.focusedByMouse });
    this.props.onFocus && this.props.onFocus(event);
  };

  onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: false, focusVisible: false });
    this.focusedByMouse = false;
    this.props.onBlur && this.props.onBlur(event);
  };

  handleInputKeyDown = (event: RadioButtonKeyDownEvent) => {
    this.setState({ focusVisible: true });
    if (!this.props.disabled) {
      this.props.onKeyDown({ value: this.props.value, ...event });
    }
  };

  private radioRef = undefined;
}
