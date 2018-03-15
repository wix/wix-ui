export const hboxDriverFactory = component => ({
    /** returns the component element */
    element: () => component,
    /** get the rendered content */
    getChildren: () => component.innerHTML
  });
