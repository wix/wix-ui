import {BaseDriver, DriverFactory} from '../../common/BaseDriver.protractor';

export interface BadgeDriver extends BaseDriver {
  getTextContent: () => Promise<string>;
}

export const badgeDriverFactory: DriverFactory<BadgeDriver> = component => ({
  /** returns the component element */
  element: () => component,
  /** returns the component text */
  getTextContent: async () => component.getText(),
});
