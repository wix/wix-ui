export const buttonDriverFactory = component => ({
  element: () => component,
  click: () => component.click(),
  getTextContent: () => component.getText(),
  isDisabled: () => !!component.getAttribute('disabled')
});
