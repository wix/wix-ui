import {mouseEnter} from 'wix-ui-test-utils/protractor';
import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface ThumbnailDriver extends BaseDriver {
  click: () => Promise<void>;
  mouseEnter: () => Promise<void>;
}

export const thumbnailDriverFactory: DriverFactory<ThumbnailDriver> = component => ({
  /** returns the component element */
  element: () => component,
  /** triggers a mouseEnter event on the compomnent */
  mouseEnter: () => mouseEnter(component),
  /** triggers a click event on the component */
  click: async () => component.click()
});
