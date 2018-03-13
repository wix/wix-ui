import * as React from 'react';
import uniqueId = require('lodash.uniqueid');
import {bool, func, object, string} from 'prop-types';
import {createHOC} from '../../createHOC';
import {getViewBox, getPathDescription} from './utils';

export type ToggleSwitchClasses = {
  root: string;
  outerLabel: string;
  innerLabel: string;
  toggleIcon: string;
};

export type ToggleSwitchStyles = {
  root?: object;
  outerLabel?: object;
  innerLabel?: object;
  toggleIcon?: object;
};

export interface ToggleSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  classes?: ToggleSwitchClasses;
  styles?: ToggleSwitchStyles;
  id?: string;
  previewState?: string;
}

/**
 * Toggle Switch
 */
class ToggleSwitch extends React.PureComponent<ToggleSwitchProps> {
  static displayName = 'ToggleSwitch';
  id: string = this.props.id || uniqueId('ToggleSwitch');
  inputRef: HTMLInputElement;

  private toggle: HTMLLabelElement;

  static propTypes = {
    /** Is the toggleSwitch checked or not */
    checked: bool,
    /** Callback function when user changes the value of the component */
    onChange: func.isRequired,
    /** Is the toggleSwitch disabled or not */
    disabled: bool,
    /** Classes object */
    classes: object.isRequired,
    /** Component ID, will be generated automatically if not provided */
    /** Styles object */
    styles: object,
    /** Component ID, will be generated automatically if not provided */
    id: string,
    /** Preview state, initiate hover, focus, etc. synthetically */
    previewState: string
  };

  static defaultProps = {checked: false, styles: {}, previewState: ''};

  _handleChange = e => {
    if (!this.props.disabled) {
      this.props.onChange(e);
    }
  }

  focus() {
    this.inputRef.focus();
  }

  blur() {
    this.inputRef.blur();
  }

  render() {
    const {checked, disabled, classes, styles, previewState} = this.props;
    const {id} = this;

    return (
      <label
          className={classes.root}
          style={styles.root}
          ref={ref => this.toggle = ref}
          data-preview={previewState}
          onClick={() => {this.inputRef && this.inputRef.focus()}}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={e => this._handleChange(e)}
          ref={el => this.inputRef = el}
        />

        <div className={classes.outerLabel} style={styles.outerLabel} aria-label="Toggle"/>
        <div className={classes.innerLabel} style={styles.innerLabel}>
          <svg className={classes.toggleIcon} style={styles.toggleIcon} viewBox={getViewBox(checked)}>
            <path d={getPathDescription(checked)}/>
          </svg>
        </div>
      </label>
    );
  }
}

export default createHOC(ToggleSwitch);
