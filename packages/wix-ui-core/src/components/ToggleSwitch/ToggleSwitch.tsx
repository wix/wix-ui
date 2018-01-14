import * as React from 'react';
import {bool, func, object, string} from 'prop-types';
import * as uniqueId from 'lodash/uniqueId';
import {createHOC} from '../../createHOC';
import ToggleOn from 'wix-ui-icons-common/system/ToggleOn';
import ToggleOff from 'wix-ui-icons-common/system/ToggleOff';

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
  iconOn?: React.ReactElement<any>;
  iconOff?: React.ReactElement<any>;
}

/**
 * Toggle Switch
 */
class ToggleSwitch extends React.PureComponent<ToggleSwitchProps> {
  static displayName = 'ToggleSwitch';
  id: string = this.props.id || uniqueId('ToggleSwitch');

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
  };

  static defaultProps = {
    checked: false,
    styles: {},
    iconOn: <ToggleOn/>,
    iconOff: <ToggleOff/>
  };

  componentDidMount() {
    this.toggle.addEventListener('keydown', this._listenToSpace);
  }

  componentWillUnmount() {
    this.toggle.removeEventListener('keydown', this._listenToSpace);
  }

  _listenToSpace = e => {
    const SPACEBAR = 32;
    if (e.keyCode === SPACEBAR) {
      e.preventDefault();
      this._handleChange(e);
    }
  }

  _handleChange = e => {
    if (!this.props.disabled) {
      this.props.onChange(e);
    }
  }

  render() {
    const {checked, disabled, classes, styles, iconOn, iconOff} = this.props;
    const {id} = this;

    return (
      <label className={classes.root} style={styles.root} tabIndex={0} ref={ref => this.toggle = ref}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={e => this._handleChange(e)}
        />

        <div className={classes.outerLabel} style={styles.outerLabel} aria-label="Toggle"/>
        <div className={classes.innerLabel} style={styles.innerLabel}>
          <div className={classes.toggleIcon} style={styles.toggleIcon}>
            {checked ? iconOn : iconOff}
          </div>
        </div>
      </label>
    );
  }
}

export default createHOC(ToggleSwitch);
