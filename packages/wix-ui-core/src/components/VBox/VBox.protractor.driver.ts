import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface VBoxDriver extends BaseDriver {}

export const vBoxDriverFactory: DriverFactory<VBoxDriver> = component => ({
  /** returns the component element */
  element: () => component
});
