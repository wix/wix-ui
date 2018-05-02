import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface BadgeDriver extends BaseDriver {
  text: () => Promise<string>;
}

export const badgeDriverFactory: DriverFactory<BadgeDriver> = component => ({
    /** returns the component element */
    element: () => component,
    /** returns the component text */
    text: async () => component.getText()
  });
