import {browser, ElementFinder} from 'protractor';
import {popoverDriverFactory} from '../../baseComponents/Popover/Popover.protractor.driver';

export const tooltipDriverFactory = (component: ElementFinder) => {
  const popoverDriver = popoverDriverFactory(component);
  return Object.assign(
    {},
    popoverDriver, {
    getTooltipLocation: () =>  popoverDriver.getContentElement().getWebElement().getLocation()
  });
};
