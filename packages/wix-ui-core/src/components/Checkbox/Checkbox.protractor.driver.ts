export const checkboxDriverFactory = component => {
  const input = component.$('input');
  return {
    /** Returns the component instance */
    element: () => component,
    /** Simulates a click on the component */
    click: () => component.click(),
    /** Indicates whether the component is disabled or not */
    isDisabled: () => component.getAttribute('disabled') === '',
    /** returns a boolean indicating if the toggleSwitch is checked */
    checked: () => input.isSelected(),
  };
};
