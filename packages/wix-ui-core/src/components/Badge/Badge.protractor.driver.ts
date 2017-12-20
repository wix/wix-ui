export const badgeDriverFactory = component => ({
  /** element method - returns the component element */
  element: () => component,
  /** getTextContent method - returns the component text */
  getTextContent: () => component.getText(),
});
