export const toggleSwitchDriverFactory = component => ({
  /** element method - returns the component element */
  element: () => component,
  /** click method - triggers toggleSwitch change */
  click: () => component.click(),
  /** isChecked method - returns a boolean indicating if the toggleSwitch is checked */
  isChecked: () => component.$('input').isSelected(),
  /** isDisabled method - returns a boolean indicating if the toggleSwitch is disabled */
  isDisabled: () => !component.$('input').isEnabled(),
  /** getTextContent method - returns the component text */
  getTextContent: () => component.getText(),
});
