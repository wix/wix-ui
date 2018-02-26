export const checkboxDriverFactory = component => ({
    /** Returns the component instance */
    element: () => component,
    /** Simulates a click on the component */
    click: () => component.click(),
    /** Indicates whether the component is disabled or not */
    isDisabled: () => component.getAttribute('disabled') === '',
    /** Indicates whether the component is checked */
    isChecked: () => component.getAttribute('aria-checked') !== 'false'
  });
