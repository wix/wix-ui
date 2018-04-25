import {ElementFinder} from 'protractor';
import {DriverFactory, BaseDriver} from '../../common/BaseDriver.protractor';

export interface ButtonDriver extends BaseDriver {
  /** returns true if the root element is present */
  exists: () => Promise<boolean>;
  /** returns the Button's text content */
  getButtonTextContent: () => Promise<string>;
  /** click the button */
  click: () => Promise<void>;
  /** checks wether the button is disabled */
  isButtonDisabled: () => Promise<boolean>;
}

export const buttonDriverFactory: DriverFactory<ButtonDriver> = element => ({
  element: () => element,
  exists: async () => element.isPresent(),
  getButtonTextContent: async () => element.getText(),
  click: async () => element.click(),
  isButtonDisabled: () => hasAttribute(element, 'disabled'),
});

// TODO: use this from wix-ui-test-utils, once it is added there
const hasAttribute = async (elementFinder: ElementFinder, attributeName: string) =>
  elementFinder.getAttribute(attributeName).then(value => value !== null);
