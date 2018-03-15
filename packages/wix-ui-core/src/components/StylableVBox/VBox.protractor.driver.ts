export const vboxDriverFactory = component => ({
  /** returns the component element */
  element: () => component,
  /** get the rendered content */
  getChildren: () => component.innerHTML
});
