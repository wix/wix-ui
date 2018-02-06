import {isAttributeExists} from 'wix-ui-test-utils';

export const dividerDriverFactory = ({element}) => ({
  /** checks if the element exists */
  exists: () => !!element,

  /** checks if the divider is vertical */
  isVertical: () =>
    isAttributeExists(element, attribute => attribute.name.includes('vertical') && attribute.value === 'true'),

  /** gets text content */
  textContent: () => element.textContent,
  element
});
