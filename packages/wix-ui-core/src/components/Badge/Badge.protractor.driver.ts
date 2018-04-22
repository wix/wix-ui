import {ElementFinder} from 'protractor';

export const badgeDriverFactory = (component: ElementFinder) => ({
  /** returns the component element */
  element: () => component,
  /** returns the component text */
  getTextContent: async () => component.getText(),
});
