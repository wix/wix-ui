export const labelDriverFactory = component => ({
    /** returns the component element */
    element: () => component,
    /** returns the component label */
    getLabelText: () => component.getText(),
    /** clicks the label */
    click: () => component.click()
  });
