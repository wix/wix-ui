export const toggleSwitchDriverFactory = component => ({
  element: () => component,
  click: () => component.click(),
  isChecked: () => component.$('input').isSelected(),
  isDisabled: () => !component.$('input').isEnabled()
});
