import * as React from 'react';
import { st, classes } from './Checkbox.st.css';
import { noop } from '../../utils';
import { filterDataProps } from '../../utils/filter-data-props';

export interface OnChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  checked: boolean;
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLElement> {
  /** hook for testing purposes */
  'data-hook'?: string;
  /** The onChange function will be called with a new checked value */
  onChange?: React.EventHandler<OnChangeEvent>;
  /** A callback to invoke on focus fired from keyboard event */
  onFocusByKeyboard?(event: React.FocusEvent<HTMLInputElement>): void;
  /** A callback to invoke on blur */
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  /** An element to be displayed when the checkbox is unchecked */
  uncheckedIcon?: JSX.Element;
  /** An element to be displayed when the checkbox is checked */
  checkedIcon?: JSX.Element;
  /** An element to be displayed when the checkbox is in indeterminate state */
  indeterminateIcon?: JSX.Element;
  /** Whether checkbox should be in error state */
  error?: boolean;
  /** Whether the checkbox is indeterminate */
  indeterminate?: boolean;
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
  'aria-describedby'?: React.AriaAttributes['aria-describedby'];
}

export interface CheckboxState {
  isFocused: boolean;
  focusVisible: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  static displayName = 'Checkbox';

  public static defaultProps: Partial<CheckboxProps> = {
    onChange: noop,
    checked: false,
    indeterminate: false,
    tabIndex: 0,
    onBlur: noop,
  };

  private checkbox: HTMLInputElement | null;
  private focusedByMouse = false;
  state = { isFocused: false, focusVisible: false };

  focus() {
    this.checkbox?.focus();
  };

  public render() {
    const {
      checked,
      disabled,
      error,
      indeterminate,
      indeterminateIcon,
      checkedIcon,
      uncheckedIcon,
    } = this.props;

    return (
      <label
        className={st(
          classes.root,
          {
            checked,
            disabled,
            focus: this.state.isFocused,
            readonly: this.props.readOnly,
            error,
            indeterminate,
            'focus-visible': this.state.focusVisible,
          },
          this.props.className,
        )}
        onMouseDown={this.handleMouseDown}
        {...filterDataProps(this.props)}
      >
        <input
          type="checkbox"
          className={classes.nativeCheckbox}
          onClick={(e) => e.stopPropagation()}
          onChange={this.handleChange}
          onKeyDown={this.handleInputKeyDown}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          ref={(ref) => (this.checkbox = ref)}
          //temp fix
          checked={checked}
          disabled={disabled}
          readOnly={this.props.readOnly}
          tabIndex={this.props.tabIndex}
          id={this.props.id}
          required={this.props.required}
          autoFocus={this.props.autoFocus}
          name={this.props.name}
          aria-controls={this.props['aria-controls']}
          aria-label={this.props['aria-label']}
          aria-invalid={this.props['aria-invalid']}
          aria-describedby={this.props['aria-describedby']}
        />

        <span className={classes.box}>
          {this.props.indeterminate
            ? indeterminateIcon
            : this.props.checked
            ? checkedIcon
            : uncheckedIcon}
        </span>

        {this.props.children ? (
          <div className={classes.childContainer}>{this.props.children}</div>
        ) : null}
      </label>
    );
  }

  private readonly handleMouseDown: React.MouseEventHandler<HTMLElement> = (
    e,
  ) => {
    //When clicking on the label, the input loses focus style state and then gains it again.
    //To prevent this we disable the default mouse down behavior and set the state to true
    if (!this.props.disabled) {
      e.preventDefault();
      this.focusedByMouse = true;
      this.setState({ isFocused: true });
    }
  };

  private readonly handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ checked: !this.props.checked, ...e });
  };

  private readonly handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    () => {
      this.setState({ focusVisible: true });
    };

  private readonly handleInputBlur: React.FocusEventHandler<HTMLInputElement> =
    (event: React.FocusEvent<HTMLInputElement>) => {
      this.state.isFocused &&
        this.setState({ isFocused: false, focusVisible: false });
      this.focusedByMouse = false;
      this.props.onBlur && this.props.onBlur(event);
    };

  private readonly handleInputFocus: React.FocusEventHandler<HTMLInputElement> =
    (event: React.FocusEvent<HTMLInputElement>) => {
      !this.focusedByMouse &&
        this.props.onFocusByKeyboard &&
        this.props.onFocusByKeyboard(event);
      this.setState({ isFocused: true, focusVisible: !this.focusedByMouse });
    };
}
