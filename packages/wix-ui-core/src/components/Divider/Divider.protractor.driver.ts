import {ElementFinder} from 'protractor';

export const dividerDriverFactory = (component: ElementFinder) => ({
  /** returns the element */
  element: () => component,

  /** checks if the element exists */
  exists: () => component.isPresent()
});
