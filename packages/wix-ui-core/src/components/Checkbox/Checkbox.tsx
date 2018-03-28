import * as React from 'react';
import style from './Checkbox.st.css';
import {noop} from 'lodash';

export interface OnChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  checked: boolean;
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLElement> {
  /** The onChange function will be called with a new checked value */
  onChange?: React.EventHandler<OnChangeEvent>;
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
}

export interface CheckboxState {
  isFocused: boolean;
  focusVisible: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  public static defaultProps: Partial<CheckboxProps> = {
    onChange: noop,
    checked: false,
    indeterminate: false,
    tabIndex: 0
  };

  private checkbox: HTMLInputElement | null;
  private focusedByMouse = false;
  state = {isFocused: false, focusVisible: false};

  public render()  {
    const {checked, disabled, readOnly: readonly, error, indeterminate, required} = this.props;
    const focus = this.state.isFocused;

    return (
      <div {...style('root', {checked, disabled, focus, readonly, error, indeterminate, 'focus-visible': this.state.focusVisible}, this.props) }
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        role="checkbox"
        aria-checked={this.props.indeterminate ? 'mixed' : this.props.checked}
      >
          <input
            type="checkbox"
            className={style.nativeCheckbox}
            checked={this.props.checked}
            disabled={this.props.disabled}
            onClick={this.handleInputClick}
            onChange={this.handleChange}
            onKeyDown={this.handleInputKeyDown}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            id={this.props.id}
            tabIndex={this.props.tabIndex}
            autoFocus={this.props.autoFocus}
            name={this.props.name}
            aria-controls={this.props['aria-controls']}
            ref={ref => this.checkbox = ref}
            required={required}
          />

          <span className={style.box}>
            {
              this.props.indeterminate ? this.props.indeterminateIcon :
              this.props.checked ? this.props.checkedIcon :
              this.props.uncheckedIcon
            }
          </span>

          {this.props.children ? (
            <div className={style.childContainer}>
              {this.props.children}
            </div>
          ) : null
          }
      </div>
    );
  }

  private handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button === 0 && this.isInteractable()) {
      this.checkbox.click();
    }
  }

  private handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    this.focusedByMouse = !this.state.isFocused;
    this.checkbox.focus();
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.isInteractable()) {
      this.props.onChange({checked: !this.props.checked, ...e});
    }
  }

  private handleInputClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    this.setState({isFocused: true});
  }

  private handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = () => {
    this.setState({focusVisible: true});
  }

  private handleInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    this.state.isFocused && this.setState({isFocused: false, focusVisible: false});
    this.focusedByMouse = false;
  }

  private handleInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    this.setState({isFocused: true, focusVisible: !this.focusedByMouse});
    this.focusedByMouse = false;
  }

  private isInteractable() {
    return !this.props.disabled && !this.props.readOnly;
  }
}
