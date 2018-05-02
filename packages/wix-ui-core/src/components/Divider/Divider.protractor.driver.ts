import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface DividerDriver extends BaseDriver {
  exists: () => Promise<boolean>;
}

export const dividerDriverFactory: DriverFactory<DividerDriver> = component => ({
  /** returns the element */
  element: () => component,

  /** checks if the element exists */
  exists: async () => component.isPresent()
});
