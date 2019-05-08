import * as React from 'react';
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
        {...style(
          'root',
          {
            checked,
            disabled,
            focus: this.state.focus,
            'focus-visible': this.state.focusVisible,
          },
          this.props,
        )}
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
          aria-label={this.props['aria-label']}
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
