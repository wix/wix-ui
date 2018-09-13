import { DriverFactory, BaseDriver } from "../../common/BaseDriver.protractor";
import { hasAttribute } from "wix-ui-test-utils/protractor";

export interface ButtonNextDriver extends BaseDriver {
  /** returns true if the root element is present */
  exists: () => Promise<boolean>;
  /** returns the Button's text content */
  getButtonTextContent: () => Promise<string>;
  /** click the button */
  click: () => Promise<void>;
  /** checks wether the button is disabled */
  isButtonDisabled: () => any;
}

export const buttonNextDriverFactory: DriverFactory<
  ButtonNextDriver
> = element => ({
  element: () => element,
  click: async () => element.click(),
  exists: async () => element.isPresent(),
  getButtonTextContent: async () => element.getText(),
  isButtonDisabled: () => hasAttribute(element, "disabled")
});
