import * as React from 'react';
import style from './RadioButton.st.css';

const noop = () => null;

export interface RadioButtonChangeEvent extends React.MouseEvent<HTMLDivElement> {
  value: string;
}

export interface RadioButtonClickEvent extends React.MouseEvent<HTMLDivElement> {
  value: string;
}

export interface RadioButtonHoverEvent extends React.MouseEvent<HTMLSpanElement> {
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
  onChange?: (event: RadioButtonChangeEvent | RadioButtonClickEvent) => void;
  /** A callback to invoke on hover */
  onHover?: (event: RadioButtonHoverEvent) => void;
  /** A callback to invoke on blur */
  onIconBlur?: (event: React.MouseEvent<HTMLElement>) => void;
  /** The checked icon */
  checkedIcon?: React.ReactNode;
  /** The unchecked icon */
  uncheckedIcon?: React.ReactNode;
  /** The label */
  label?: React.ReactNode;
  /** Sets the disabled status of the radio */
  disabled?: boolean;
  /** Sets the required status of the radio */
  required?: boolean;
}

export interface RadioButtonState {
  focused: boolean;
}

export class RadioButton extends React.Component<RadioButtonProps, RadioButtonState> {

  state = {
    focused: false
  };

  static defaultProps = {
    onChange: noop,
    onHover: noop,
    onBlur: noop
  };

  render() {
    const {value, name, checkedIcon, uncheckedIcon, label, checked,
           disabled, required, onIconBlur} = this.props;
    const focused = this.state.focused;

    return (
      <div {...style('root', {checked, disabled, focused}, this.props)}
           onChange={this.handleInputChange} onClick={this.handleInputChange}
           role="radio" aria-checked={checked}>
        <input type="radio" className={style.hiddenRadio} disabled={disabled} required={required}
               onFocus={this.onFocus} onBlur={this.onInputBlur} defaultChecked={checked}
               value={value} name={name} />
        <span className={style.icon} onMouseEnter={this.onHover} onMouseLeave={onIconBlur}>
          {checked ? checkedIcon : uncheckedIcon}
        </span>
        <span className={style.label}>{label}</span>
      </div>
    );
  }

  handleInputChange = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.props.disabled) {
      this.props.onChange({value: this.props.value, ...event});
    }
  }

  onHover = (event: React.MouseEvent<HTMLSpanElement>) => {
    this.props.onHover({value: this.props.value, ...event});
  }

  onFocus = () => {
    this.setState({focused: true});
  }

  onInputBlur = () => {
    this.setState({focused: false});
  }
}
