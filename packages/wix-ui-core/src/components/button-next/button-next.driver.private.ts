import { BaseDriver, DriverFactory } from "wix-ui-test-utils/driver-factory";

export interface ButtonPrivateDriver extends BaseDriver {
  suffixExists: () => boolean;
  prefixExists: () => boolean;
}

export const buttonPrivateDriverFactory: DriverFactory<ButtonPrivateDriver> = ({
  element
}): ButtonPrivateDriver => {
  return {
    exists: () => !!element,
    suffixExists: () => !!element.querySelector('[data-hook="suffix"]'),
    prefixExists: () => !!element.querySelector('[data-hook="prefix"]')
  };
};
