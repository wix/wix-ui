import * as React from 'react';
import uniqueId = require('lodash.uniqueid');
import {bool, func, object, string, Requireable} from 'prop-types';
import {getViewBox, getPathDescription} from '../ToggleSwitch/utils';
import style from './ToggleSwitch.st.css';

export type ToggleSwitchStyles = {
  root?: object;
  outerLabel?: object;
  innerLabel?: object;
  toggleIcon?: object;
};

export interface ToggleSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  styles?: ToggleSwitchStyles;
  id?: string;
}

/**
 * Toggle Switch
 */
export class ToggleSwitch<P = {}> extends React.PureComponent<ToggleSwitchProps & P> {
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
    /** Styles object */
    styles: object,
    /** Component ID, will be generated automatically if not provided */
    id: string
  };

  static defaultProps = {checked: false, styles: {}};

  componentDidMount() {
    this.toggle.addEventListener('keydown', this._listenToSpace);
  }

  componentWillUnmount() {
    this.toggle.removeEventListener('keydown', this._listenToSpace);
  }

  _listenToSpace = e => {
    if (e.key === ' ') {
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
    const {checked, disabled, styles} = this.props;
    const {id} = this;

    return (
      <label {...style('root', {checked, disabled}, this.props)} style={styles.root} tabIndex={0} ref={ref => this.toggle = ref}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={e => this._handleChange(e)}
        />

        <div className={style.outerLabel} style={styles.outerLabel} aria-label="Toggle"/>
        <div className={style.innerLabel} style={styles.innerLabel}>
          <svg className={style.toggleIcon} viewBox={getViewBox(checked)}>
            <path d={getPathDescription(checked)}/>
          </svg>
        </div>
      </label>
    );
  }
}
