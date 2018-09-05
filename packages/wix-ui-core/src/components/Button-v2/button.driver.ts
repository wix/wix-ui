import {
  BaseDriver,
  ComponentFactory,
  DriverFactory
} from "wix-ui-test-utils/driver-factory";

export interface ButtonDriver {
  exists: () => boolean;
  /** click on the button root element */
  click: () => any;
}

export const buttonDriverFactory: DriverFactory<ButtonDriver> = ({
  element,
  eventTrigger
}: ComponentFactory): ButtonDriver => {
  return {
    exists: () => !!element,
    click: () => eventTrigger.click(element)
  };
};
