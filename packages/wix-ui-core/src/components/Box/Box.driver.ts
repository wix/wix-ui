export const boxDriverFactory = ({element, componentInstance}) => {

  return {
    /** check if element exists */
    exists: () => !!element,
    /** return box flex direction value */
    getFlexDirection: () => window.getComputedStyle(element).flexDirection,
    /** return box item alignment value */
    getAlignment: () => window.getComputedStyle(element).alignItems,
  };
};
