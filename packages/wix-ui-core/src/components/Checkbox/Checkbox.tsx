import * as React from 'react';
import styles from './Checkbox.st.css';
import {noop} from '../../utils';

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
    const {checked, disabled, error, indeterminate, indeterminateIcon, checkedIcon, uncheckedIcon,
      //These vars are not used on purpose. We do this so that they will not be in inputProps and won't overwrite the vars we are passing to the native input
      onChange, children, className, ...inputProps} = this.props;

    return (
      <label {...styles('root', {checked, disabled, focus: this.state.isFocused, readonly: this.props.readOnly, error, indeterminate, 'focus-visible': this.state.focusVisible}, this.props) }
        onMouseDown={this.handleMouseDown}>
          <input
            type="checkbox"
            className={styles.nativeCheckbox}
            checked={this.props.checked}
            disabled={this.props.disabled}
            onChange={this.handleChange}
            onKeyDown={this.handleInputKeyDown}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            ref={ref => this.checkbox = ref}
            {...inputProps}
          />

          <span className={styles.box}>
            {
              this.props.indeterminate ? indeterminateIcon :
              this.props.checked ? checkedIcon :
              uncheckedIcon
            }
          </span>

          {this.props.children ? (
            <div className={styles.childContainer}>
              {this.props.children}
            </div>
          ) : null
          }
      </label>
    );
  }

  private handleMouseDown: React.MouseEventHandler<HTMLElement> = (e) => {
    //When clicking on the label, the input loses focus style state and then gains it again.
    //To prevent this we disable the default mouse down behavior and set the state to true
    e.preventDefault();
    this.focusedByMouse = true;
    this.setState({isFocused: true});
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.props.onChange({checked: !this.props.checked, ...e});
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
  }
}
