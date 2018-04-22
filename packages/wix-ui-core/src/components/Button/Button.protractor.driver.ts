export const buttonDriverFactory = component => ({
  /** returns the component element */
  element: () => component,
  /** returns the Button's text content */
  getTextContent: () => component.getText(),
});
