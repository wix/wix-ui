import {ElementFinder} from 'protractor';

export interface ButtonDriver {
   /** returns the root element of the component */
   element: () => ElementFinder;
   /** returns the Button's text content */
   getButtonTextContent: () => Promise<string>;
   /** click the button */
   click: () => Promise<void>;
   /** checks wether the button is disabled */
   isButtonDisabled: () => Promise<boolean>;
}

export const buttonDriverFactory: (element: ElementFinder  ) => ButtonDriver = element => ({
  /** returns the root element of the component */
  element: () => element,
  /** returns the Button's text content */
  getButtonTextContent: async () => element.getText(),
  /** click the button */
  click: async () => element.click(),
  /** checks wether the button is disabled */
  isButtonDisabled: () => hasAttribute(element, 'disabled'),
});

// TODO: use this from wix-ui-test-utils, once it is added there
const hasAttribute = async (elementFinder: ElementFinder, attributeName: string) =>
  elementFinder.getAttribute(attributeName).then(value => value !== null);
