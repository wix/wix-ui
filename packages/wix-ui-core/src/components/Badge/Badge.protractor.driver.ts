export const badgeDriverFactory = component => ({
  element: () => component,
  getTextContent: () => component.getText(),
});
