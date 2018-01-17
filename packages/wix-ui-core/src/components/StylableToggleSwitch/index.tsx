import * as React from 'react';
import {bool, func, string} from 'prop-types';
import * as uniqueId from 'lodash/uniqueId';
import {getViewBox, getPathDescription} from '../ToggleSwitch/utils';
import style from './ToggleSwitch.st.css';

export interface ToggleSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  id?: string;
}

/**
 * Toggle Switch
 */
export class ToggleSwitch extends React.PureComponent<ToggleSwitchProps> {
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
    /** Component ID, will be generated automatically if not provided */
    id: string,
  };

  static defaultProps = {checked: false};

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
    const {checked, disabled} = this.props;
    const {id} = this;

    return (
      <div {...style('root', {checked, disabled}, this.props)} tabIndex={0} ref={ref => this.toggle = ref}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={e => this._handleChange(e)}
        />

        <label htmlFor={id} className={style.outerLabel}/>
        <label htmlFor={id} className={style.innerLabel}>
          <svg className={style.toggleIcon} viewBox={getViewBox(checked)}>
            <path d={getPathDescription(checked)}/>
          </svg>
        </label>
      </div>
    );
  }
}

export default ToggleSwitch;
