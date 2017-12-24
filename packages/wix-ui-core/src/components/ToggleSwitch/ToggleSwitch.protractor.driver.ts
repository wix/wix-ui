export const toggleSwitchDriverFactory = component => ({
  /** returns the component element */
  element: () => component,
  /** triggers toggleSwitch change */
  click: () => component.click(),
  /** returns a boolean indicating if the toggleSwitch is checked */
  isChecked: () => component.$('input').isSelected(),
  /** returns a boolean indicating if the toggleSwitch is disabled */
  isDisabled: () => !component.$('input').isEnabled(),
  /** returns the component text */
  getTextContent: () => component.getText(),
});
