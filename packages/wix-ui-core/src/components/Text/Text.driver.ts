const getClasses = (element) => {
  const rawCssClasses = element.getAttribute('class');
  let cssClasses = [];
  if (rawCssClasses !== null) {
    cssClasses = element.getAttribute('class').split(' ');
  }
  return cssClasses;
};

export const textDriverFactory = ({element}) => {
  return {
    /** check if element exists */
    exists: () => !!element,
    /** check if component has ellipsis */
    isEllipsis: className => getClasses(element).indexOf('ellipsis') !== -1,
    /** check if element has title attribute */
    hasTitleAttribute: () => element.getAttribute('title') !== null,
    /** return text font-family value */
    getFontFamily: () => window.getComputedStyle(element).fontFamily
  };
};
