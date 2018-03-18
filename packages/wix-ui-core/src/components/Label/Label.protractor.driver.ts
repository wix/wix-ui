export const labelDriverFactory = component => ({
    /** returns the component element */
    element: () => component,
    /** returns the component label */
    getLabelContent: () => component.getText()
  });
