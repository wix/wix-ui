import * as React from 'react';
import { style, classes } from './ToggleSwitch.st.css';
import { dataHooks } from './constants';

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
  onChange?(): void;
  styles?: ToggleSwitchStyles;
  id?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  'aria-label'?: string;
}

export interface ToggleSwitchState {
  focus: boolean;
  focusVisible: boolean;
}

/**
 * Toggle Switch
 */
export class ToggleSwitch extends React.PureComponent<
  ToggleSwitchProps,
  ToggleSwitchState
> {
  static displayName = 'ToggleSwitch';

  static defaultProps = {
    checked: false,
    styles: {},
    tabIndex: 0,
    onChange: () => null,
  };

  public state = {
    focus: false,
    focusVisible: false,
  };

  // We don't want to show outline when the component is focused by mouse.
  private focusedByMouse = false;

  render() {
    const { checked, disabled, styles: inlineStyles } = this.props;

    return (
      <div
        className={style(classes.root, {
          checked,
          disabled,
          focus: this.state.focus,
          'focus-visible': this.state.focusVisible,
        })}
        style={inlineStyles.root}
      >
        <div
          data-hook={dataHooks.track}
          className={classes.track}
          style={inlineStyles.track}
        />
        <div
          data-hook={dataHooks.knob}
          className={classes.knob}
          style={inlineStyles.knob}
        >
          <div
            data-hook={dataHooks.knobIcon}
            className={classes.knobIcon}
            style={inlineStyles.knobIcon}
          >
            {checked ? this.props.checkedIcon : this.props.uncheckedIcon}
          </div>
        </div>
        <input
          id={this.props.id}
          className={classes.input}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          tabIndex={this.props.tabIndex}
          onChange={this.props.onChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseDown={this.handleMouseDown}
          onKeyDown={this.handleKeyDown}
          aria-label={this.props['aria-label']}
          data-hook={dataHooks.toggleSwitchInput}
        />
      </div>
    );
  }

  private readonly handleKeyDown: React.KeyboardEventHandler<
    HTMLElement
  > = e => {
    // Pressing any key should make the focus visible, even if the checkbox
    // was initially focused by mouse.
    this.setState({ focusVisible: true });
  };

  // Doesn't get invoked if the input is disabled.
  private readonly handleMouseDown: React.MouseEventHandler<
    HTMLElement
  > = e => {
    if (e.button === 0) {
      this.focusedByMouse = true;
    }
  };

  private readonly handleFocus: React.FocusEventHandler<HTMLElement> = e => {
    this.setState({ focus: true, focusVisible: !this.focusedByMouse });
  };

  private readonly handleBlur: React.FocusEventHandler<HTMLElement> = e => {
    this.setState({ focus: false, focusVisible: false });
    this.focusedByMouse = false;
  };
}
