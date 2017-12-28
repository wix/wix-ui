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
    id: string,
  };

  componentDidMount() {
    this.toggle.addEventListener('keydown', this.listenToSpace);
  }

  componentWillUnmount() {
    this.toggle.removeEventListener('keydown', this.listenToSpace);
  }

  listenToSpace = e => {
    const SPACEBAR = 32;
    if (e.keyCode === SPACEBAR) {
      e.preventDefault();
      this.handleChange(e);
    }
  }

  handleChange(e) {
    if (!this.props.disabled) {
      this.props.onChange(e);
    }
  }

  render() {
    const {checked, disabled, classes} = this.props;
    const id = this.props.id || this.id;

    return (
      <div className={classes.root}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={e => this.handleChange(e)}
        />

        <label htmlFor={id} className={classes.outerLabel} tabIndex={0} ref={ref => this.toggle = ref}/>
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
