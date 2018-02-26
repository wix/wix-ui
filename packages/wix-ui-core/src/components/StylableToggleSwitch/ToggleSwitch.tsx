import * as React from 'react';
import * as propTypes from 'prop-types';
import tsStyle from './ToggleSwitch.st.css';

export interface ToggleSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  onChange: () => void;
  style?: React.CSSProperties;
  id?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
}

export interface ToggleSwitchState {
  focus: boolean;
}

/**
 * Toggle Switch
 */
export class ToggleSwitch extends React.PureComponent<ToggleSwitchProps, ToggleSwitchState> {
  static displayName = 'ToggleSwitch';

  static propTypes = {
    /** Is the toggleSwitch checked or not */
    checked: propTypes.bool,
    /** Is the toggleSwitch disabled or not */
    disabled: propTypes.bool,
    /** Tab index */
    tabIndex: propTypes.number,
    /** Callback function when user changes the value of the component */
    onChange: propTypes.func.isRequired,
    /** Styles object */
    styles: propTypes.object,
    /** Component ID, will be generated automatically if not provided */
    id: propTypes.string
  };

  static defaultProps = {
    checked: false,
    tabIndex: 0
  };

  public state = {
    focus: false
  };

  // We don't want to show outline when the component is focused by mouse.
  private holdingMouseButton = false;

  render() {
    const {checked, disabled} = this.props;

    return (
      <label
        {...tsStyle('root', {checked, disabled, focus: this.state.focus}, this.props)}
        style={this.props.style}
        tabIndex={disabled ? null : this.props.tabIndex}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        <div className={tsStyle.track} />
        <div className={tsStyle.knob}>
          <div className={tsStyle.knobIcon}>
            {checked ? this.props.checkedIcon : this.props.uncheckedIcon}
          </div>
        </div>
        <input
          className={tsStyle.nativeInput}
          type="checkbox"
          id={this.props.id}
          checked={checked}
          disabled={disabled}
          onChange={this.handleChange}
        />
      </label>
    );
  }

  private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = e => {
    if (e.key === ' ' && !this.props.disabled) {
      e.preventDefault(); // block page scroll
      this.setState({focus: true});
    }
  };

  // Firefox doesn't handle Space press on checkboxes
  private handleKeyUp: React.KeyboardEventHandler<HTMLElement> = e => {
    if (e.key === ' ' && !this.props.disabled) {
      this.props.onChange();
    }
  };

  private handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.props.onChange();
  };

  private handleMouseDown: React.MouseEventHandler<HTMLElement> = e => {
    if (e.button === 0) {
      this.holdingMouseButton = true;
    }
  };

  private handleMouseUp: React.MouseEventHandler<HTMLElement> = e => {
    if (e.button === 0) {
      this.holdingMouseButton = false;
    }
  };

  private handleFocus: React.FocusEventHandler<HTMLElement> = e => {
    if (!this.holdingMouseButton) {
      this.setState({focus: true});
    }
  };

  private handleBlur: React.FocusEventHandler<HTMLElement> = e => {
    this.setState({focus: false});
  };
}
