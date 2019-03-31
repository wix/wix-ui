import { ILocation } from 'wix-ui-test-utils/protractor';
import { BaseDriver, DriverFactory } from '../../common/BaseDriver.protractor';
import {
  popoverDriverFactory,
  PopoverDriver,
} from '../popover/Popover.protractor.driver';

export interface TooltipDriver extends PopoverDriver {
  getTooltipLocation(): Promise<ILocation>;
}

export const tooltipDriverFactory: DriverFactory<TooltipDriver> = component => {
  const popoverDriver = popoverDriverFactory(component);

  return {
    ...popoverDriver,
    getTooltipLocation: async () =>
      popoverDriver
        .getContentElement()
        .getWebElement()
        .getLocation(),
  };
};
