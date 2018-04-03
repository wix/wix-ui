import * as React from 'react';
import * as propTypes from 'prop-types';
import style from './ToggleSwitch.st.css';

// The only reason this exists is that Santa currently doesn't support boolean and number types
// in the style panel, and some of the styling options have to live in the layout panel,
// and we pass them down as inline styles.
export interface ToggleSwitchStyles {
  root?: React.CSSProperties;
  track?: React.CSSProperties;
  knob?: React.CSSProperties;
  knobIcon?: React.CSSProperties;
}

export interface ToggleSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  onChange?: () => void;
  styles?: ToggleSwitchStyles;
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
    /** Inline styles for various parts of the switch */
    styles: propTypes.object,
    /** The ID attribute to put on the toggle */
    id: propTypes.string,
    /** Icon inside of the knob when checked */
    checkedIcon: propTypes.node,
    /** Icon inside of the knob when unchecked */
    uncheckedIcon: propTypes.node
  };

  static defaultProps = {
    checked: false,
    styles: {},
    tabIndex: 0,
    onChange: () => null
  };

  public state = {
    focus: false,
    focusVisible: false
  };

  // We don't want to show outline when the component is focused by mouse.
  private focusedByMouse = false;

  render() {
    const {checked, disabled, styles: inlineStyles} = this.props;

    return (
      <div
        {...style('root', {
          checked,
          disabled,
          focus: this.state.focus,
          'focus-visible': this.state.focusVisible
        }, this.props)}
        style={inlineStyles.root}
      >
        <div className={style.track} style={inlineStyles.track} />
        <div className={style.knob} style={inlineStyles.knob}>
          <div className={style.knobIcon} style={inlineStyles.knobIcon}>
            {checked ? this.props.checkedIcon : this.props.uncheckedIcon}
          </div>
        </div>
        <input
          id={this.props.id}
          className={style.input}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          tabIndex={this.props.tabIndex}
          onChange={this.props.onChange}
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

  // Doesn't get invoked if the input is disabled.
  private handleMouseDown: React.MouseEventHandler<HTMLElement> = e => {
    if (e.button === 0) {
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
