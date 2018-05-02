/* global Promise */

import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface LinkDriver extends BaseDriver {
  click: () => Promise<void>;
  exists: () => Promise<boolean>;
}

export const linkDriverFactory: DriverFactory<LinkDriver> = element => ({
  /** return rendered element */
  element: () => element,

  /** check if element is part of document */
  exists: async () => await element.isPresent(),

  /** trigger click event */
  click: async () => element.click()
});
