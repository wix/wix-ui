import {ElementFinder} from 'protractor';

export const vBoxDriverFactory = (component: ElementFinder) => ({
  /** returns the component element */
  element: () => component
});
