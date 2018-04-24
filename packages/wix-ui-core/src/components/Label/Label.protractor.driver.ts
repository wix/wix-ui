import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface LabelDriver extends BaseDriver {
  getLabelText: () => Promise<string>;
  click: () => Promise<void>;
}

export const labelDriverFactory: DriverFactory<LabelDriver> = component => ({
    /** returns the component element */
    element: () => component,
    /** returns the component label */
    getLabelText: async () => component.getText(),
    /** clicks the label */
    click: async () => component.click()
  });
