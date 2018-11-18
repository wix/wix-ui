import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface ToggleSwitchDriver extends BaseDriver {
  click: () => Promise<void>;
  isDisabled: () => Promise<boolean>;
  checked: () => Promise<boolean>;
}

export const toggleSwitchDriverFactory: DriverFactory<ToggleSwitchDriver> = component => {
  const input = component.$('input');

  return {
    /** returns the component element */
    element: () => component,
    /** triggers toggleSwitch change */
    click: async () => component.click(),
    /** returns a boolean indicating if the toggleSwitch is checked */
    checked: async () => input.isSelected(),
    /** returns a boolean indicating if the toggleSwitch is disabled */
    isDisabled: async () => input.isEnabled().then(enabled => !enabled)
  };
};
