export const buttonLayoutDriverFactory = component => ({
  element: () => component,
  click: () => component.click(),
  getTextContent: () => component.getText(),
  isDisabled: () => !!component.getAttribute('disabled')
});
