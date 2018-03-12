import * as React from 'react';
import style from './Checkbox.st.css';
import {bool, func, string, number, array, node} from 'prop-types';

export interface OnChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  checked: boolean;
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLElement> {
  onChange?: React.EventHandler<OnChangeEvent>;
  tickIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
  error?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxState {
  isFocused: boolean;
}

/**
 * Checkbox
 */
export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  public static defaultProps: Partial<CheckboxProps> = {
    tickIcon: (
      <span
        className={`${style.icon} ${style.tickIcon}`}
      />
    ),
    indeterminateIcon: (
      <span
        className={`${style.icon} ${style.indeterminateIcon}`}
      />
    ),
    // tslint:disable-next-line:no-empty
    onChange: () => { },
    checked: false,
    indeterminate: false,
    tabIndex: 0
  };

  private checkbox: HTMLInputElement | null;
  state = {isFocused: false};

  public render()  {
    const {checked, disabled, readOnly: readonly, error, indeterminate, required} = this.props;
    const focus = this.state.isFocused;

    return (
      <div {...style('root', {checked, disabled, focus, readonly, error, indeterminate}, this.props) }
        onClick={this.handleClick}
        onKeyDown={this.handleKeydown}
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
            {this.props.indeterminate ?
              this.props.indeterminateIcon : (this.props.checked && this.props.tickIcon)}
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

  private handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (this.isInteractable()) {
      const SPACEBAR = ' ';
      const LEGACY_SPACEBAR = 'Spacebar';
      if (e.key === SPACEBAR || e.key === LEGACY_SPACEBAR) {
        e.preventDefault();
        this.checkbox.click();
      }
      !this.state.isFocused && this.setState({isFocused: true});
    }
  }

  private handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    if (e.button === 0 && this.isInteractable()) {
      this.checkbox.click();
      this.checkbox.focus();
      this.setState({isFocused: false});
    }
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.isInteractable()) {
      this.props.onChange({checked: !this.props.checked, ...e});
    }
  }

  private handleInputClick: React.MouseEventHandler<HTMLInputElement> = e => {
    this.setState({isFocused: true});
  }

  private handleInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    this.state.isFocused && this.setState({isFocused: false});
  }

  private handleInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    !this.state.isFocused && this.setState({isFocused: true});
  }

  private isInteractable() {
    return !this.props.disabled && !this.props.readOnly;
  }
}
