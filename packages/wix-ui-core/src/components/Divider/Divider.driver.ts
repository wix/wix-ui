export const dividerDriverFactory = ({element}) => ({
  /** checks if the element exists */
  exists: () => !!element,

  /** checks if the divider is vertical */
  isVertical: () => window.getComputedStyle(element).height === 'auto'
});
