export const dropdownOptionDriverFactory = component => {
  return {
    element: () => component,
    click: () => component.click(),
    getText: () => component.getText()
  };
};
