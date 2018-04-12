import {ElementFinder} from 'protractor';

export const toggleSwitchDriverFactory = (component: ElementFinder) => {
  const input = component.$('input');
  return {
    /** returns the component element */
    element: () => component,
    /** triggers toggleSwitch change */
    click: async () => component.click(),
    /** returns a boolean indicating if the toggleSwitch is checked */
    checked: async () => input.isSelected(),
    /** returns a boolean indicating if the toggleSwitch is disabled */
    isDisabled: () => !input.isEnabled()
  };
};
