import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface TimePickerDriver extends BaseDriver {}

export const timePickerDriverFactory: DriverFactory<TimePickerDriver> = component => ({
  /** returns the component element */
  element: () => component,
});
