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

interface ToggleSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  classes: ToggleSwitchClasses;
  id?: string;
}

/**
 * Toggle Switch
 */
class ToggleSwitch extends React.PureComponent<ToggleSwitchProps> {
  static displayName = 'ToggleSwitch';
  id: string = uniqueId('ToggleSwitch');

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
    id: string,
  };

  render() {
    const {checked, disabled, onChange, classes} = this.props;
    const id = this.props.id || this.id;

    return (
      <div className={classes.root}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={e => !disabled && onChange(e)}
        />

        <label htmlFor={id} className={classes.outerLabel}/>
        <label htmlFor={id} className={classes.innerLabel}>
          <svg className={classes.toggleIcon} viewBox={getViewBox(checked)}>
            <path d={getPathDescription(checked)}/>
          </svg>
        </label>
      </div>
    );
  }
}

export default createHOC(ToggleSwitch);
