import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface TextDriver extends BaseDriver {
  getText: () => Promise<string>;
}

export const textDriverFactory: DriverFactory<TextDriver> = component => ({
    /** returns the component element */
    element: () => component,
    /** returns the component text */
    getText: async () => component.getText()
  });
