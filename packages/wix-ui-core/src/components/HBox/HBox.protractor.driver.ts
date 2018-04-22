import {ElementFinder} from 'protractor';

export const hBoxDriverFactory = (component: ElementFinder) => ({
  /** Returns the wrapped component instance */
  element: () => component
});
