import * as React from 'react';
import * as propTypes from 'prop-types';
import tsStyle from './ToggleSwitch.st.css';

export interface ToggleSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  onChange?: () => void;
  style?: React.CSSProperties;
  id?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
}

export interface ToggleSwitchState {
  focus: boolean;
  focusVisible: boolean;
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
    onChange: propTypes.func,
    /** Inline style for the root */
    style: propTypes.object,
    /** The ID attribute to put on the toggle */
    id: propTypes.string,
    /** Icon inside of the knob when checked */
    checkedIcon: propTypes.node,
    /** Icon inside of the knob when unchecked */
    uncheckedIcon: propTypes.node
  };

  static defaultProps = {
    checked: false,
    tabIndex: 0
  };

  public state = {
    focus: false,
    focusVisible: false
  };

  // We don't want to show outline when the component is focused by mouse.
  private focusedByMouse = false;

  render() {
    const {checked, disabled} = this.props;

    return (
      <div
        {...tsStyle('root', {
          checked,
          disabled,
          focus: this.state.focus,
          focusVisible: this.state.focusVisible
        }, this.props)}
        style={this.props.style}
      >
        <div className={tsStyle.track} />
        <div className={tsStyle.knob}>
          <div className={tsStyle.knobIcon}>
            {checked ? this.props.checkedIcon : this.props.uncheckedIcon}
          </div>
        </div>
        <input
          id={this.props.id}
          className={tsStyle.input}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          tabIndex={this.props.tabIndex}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseDown={this.handleMouseDown}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }

  private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = e => {
    // Pressing any key should make the focus visible, even if the checkbox
    // was initially focused by mouse.
    this.setState({focusVisible: true});
  }

  private handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  // Doesn't get invoked if the input is disabled.
  private handleMouseDown: React.MouseEventHandler<HTMLElement> = e => {
    if (e.button === 0 && !this.state.focus) {
      this.focusedByMouse = true;
    }
  }

  private handleFocus: React.FocusEventHandler<HTMLElement> = e => {
    this.setState({focus: true, focusVisible: !this.focusedByMouse});
  }

  private handleBlur: React.FocusEventHandler<HTMLElement> = e => {
    this.setState({focus: false, focusVisible: false});
    this.focusedByMouse = false;
  }
}
