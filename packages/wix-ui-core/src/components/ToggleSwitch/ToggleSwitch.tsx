import * as React from 'react';
import {bool, func, object} from 'prop-types';
import * as uniqueId from 'lodash/uniqueId';
import {createHOC} from '../../createHOC';

type ToggleSwitchClasses = {
  root: string;
  outerLabel: string;
  innerLabel: string;
  toggleActive: string;
  toggleInactive: string;
};

interface ToggleSwitchProps {
  checked: boolean;
  disabled: boolean;
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  classes: ToggleSwitchClasses;
}

/**
 * Toggle Switch
 */
class ToggleSwitch extends React.PureComponent<ToggleSwitchProps> {
  private id: string;

  static displayName = 'ToggleSwitch';

  static propTypes = {
    /** Is the toggleSwitch checked or not  */
    checked: bool,

    /** Callback function when user changes the value of the component  */
    onChange: func.isRequired,

    /** Is the toggleSwitch disabled or not  */
    disabled: bool,

    classes: object.isRequired
  };

  constructor(props) {
    super(props);
    this.id = uniqueId('ToggleSwitch');
  }

  render() {
    const {checked, disabled, onChange, classes} = this.props;
    const {id} = this;

    return (
      <div className={classes.root}>
        <input type="checkbox" id={id} checked={checked} disabled={disabled} onChange={e => !disabled && onChange(e)}/>
        <label htmlFor={id} className={classes.outerLabel}>
          <label htmlFor={id} className={classes.innerLabel}>
            <svg className={classes.toggleActive} viewBox="0 0 41 32">
              <path
                d="M0.169 17.815c0.169 1.098 0.76 2.111 1.689 2.871l14.269 10.385c1.942 1.435 4.644 1.013 6.079-0.844l18.069-23.303c1.435-1.858 1.098-4.559-0.844-5.995s-4.644-1.098-6.164 0.844l-15.367 19.842-10.723-7.852c-1.942-1.435-4.644-1.013-6.164 0.844-0.76 0.929-1.013 2.111-0.844 3.208z"/>
            </svg>
            <svg className={classes.toggleInactive} viewBox="0 0 143 32">
              <path d="M0 0h142.545v32h-142.545v-32z"/>
            </svg>
          </label>
        </label>
      </div>
    );
  }
}

export default createHOC(ToggleSwitch);
