/* global Promise */

import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface LinkDriver extends BaseDriver {
  click: () => Promise<void>;
  isPresent: () => Promise<boolean>;
}

export const linkDriverFactory: DriverFactory<LinkDriver> = element => ({
  /** return rendered element */
  element: () => element,

  /** check if element is part of document */
  isPresent: async () => await element.isPresent(),

  /** trigger click event */
  click: async () => element.click()
});
