export const toggleSwitchDriverFactory = component => {
  const input = component.$('input');
  return {
    /** returns the component element */
    element: () => component,
    /** triggers toggleSwitch change */
    click: () => component.click(),
    /** returns a boolean indicating if the toggleSwitch is checked */
    checked: () => input.isSelected(),
    /** returns a boolean indicating if the toggleSwitch is disabled */
    isDisabled: () => !input.isEnabled()
  };
};
