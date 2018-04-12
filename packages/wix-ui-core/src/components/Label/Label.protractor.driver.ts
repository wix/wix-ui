import {ElementFinder} from 'protractor';

export const labelDriverFactory = (component: ElementFinder) => ({
    /** returns the component element */
    element: () => component,
    /** returns the component label */
    getLabelText: async () => component.getText(),
    /** clicks the label */
    click: async () => component.click()
  });
