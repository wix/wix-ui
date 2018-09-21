import {
  ComponentFactory,
  DriverFactory,
  BaseDriver
} from "wix-ui-test-utils/driver-factory";

export interface ButtonNextDriver extends BaseDriver {
  /** click on the button root element */
  click: () => void;
  /** returns elements textContent */
  getTextContent: () => any;
}

export const buttonNextDriverFactory: DriverFactory<ButtonNextDriver> = ({
  element,
  eventTrigger
}: ComponentFactory): ButtonNextDriver => {
  return {
    exists: () => !!element,
    getTextContent: () => element.textContent,
    click: () => eventTrigger.click(element)
  };
};
