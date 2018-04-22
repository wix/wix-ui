import {ElementFinder} from 'protractor';

export const textDriverFactory = (component: ElementFinder) => ({
    /** returns the component element */
    element: () => component,
    /** returns the component text */
    getText: async () => component.getText()
  });
