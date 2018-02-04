export const timePickerDriverFactory = component => ({
  /** returns the component element */
  element: () => component,
  /** triggers timePicker change */
  click: () => component.click(),
  /** returns a boolean indicating if the timePicker is disabled */
  isDisabled: () => !component.$('input').isEnabled()
});
