export const dividerDriverFactory = component => ({
  /** returns the element */
  element: () => component,

  /** checks if the element exists */
  exists: () => !!component
});
