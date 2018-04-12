import {ElementFinder} from 'protractor';

export const timePickerDriverFactory = (component: ElementFinder) => ({
  /** returns the component element */
  element: () => component,
});
