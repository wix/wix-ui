import * as React from 'react';
import {bool, func, object, string} from 'prop-types';
import * as uniqueId from 'lodash/uniqueId';
import {createHOC} from '../../createHOC';
import {getViewBox, getPathDescription} from './utils';

type ToggleSwitchClasses = {
  root: string;
  outerLabel: string;
  innerLabel: string;
  toggleIcon: string;
};

type ToggleSwitchStyles = {
  root: object;
  outerLabel: object;
  innerLabel: object;
  toggleIcon: object;
};

interface ToggleSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  classes: ToggleSwitchClasses;
  styles?: ToggleSwitchStyles;
  id?: string;
}

/**
 * Toggle Switch
 */
class ToggleSwitch extends React.PureComponent<ToggleSwitchProps> {
  static displayName = 'ToggleSwitch';
  id: string = this.props.id || uniqueId('ToggleSwitch');

  private toggle: HTMLDivElement;

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

  static defaultProps = {checked: false, styles: {}};

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
    const {checked, disabled, classes, styles} = this.props;
    const {id} = this;

    return (
      <div className={classes.root} style={styles.root} tabIndex={0} ref={ref => this.toggle = ref}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={e => this._handleChange(e)}
        />

        <label htmlFor={id} className={classes.outerLabel} style={styles.outerLabel}/>
        <label htmlFor={id} className={classes.innerLabel} style={styles.innerLabel}>
          <svg className={classes.toggleIcon} style={styles.toggleIcon} viewBox={getViewBox(checked)}>
            <path d={getPathDescription(checked)}/>
          </svg>
        </label>
      </div>
    );
  }
}

export default createHOC(ToggleSwitch);
