export const dividerDriverFactory = ({element}) => ({
  /** checks if the element exists */
  exists: () => !!element,

  /** checks if the divider is vertical */
  isVertical: () => element.className.includes('vertical'),

  /** gets text content */
  textContent: () => element.textContent,
  element
});
