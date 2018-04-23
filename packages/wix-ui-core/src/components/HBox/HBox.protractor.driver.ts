import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';
import {HBoxDriver} from './HBox.protractor.driver';

export interface HBoxDriver extends BaseDriver {}

export const hBoxDriverFactory: DriverFactory<HBoxDriver> = (component) => ({
  /** Returns the wrapped component instance */
  element: () => component
});
