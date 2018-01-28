export const dividerDriverFactory = ({element}) => ({
  /** checks if the element exists */
  exists: () => !!element,

  /** checks if the divider is vertical */
  isVertical: () =>  {
    for (let i = 0; i < element.attributes.length; ++i) {
      const attribute = element.attributes.item(i);
      if (attribute.name.includes('vertical') && attribute.value === 'true') {
        return true;
      }
    }
    return false;
  },

  /** gets text content */
  textContent: () => element.textContent,
  element
});
