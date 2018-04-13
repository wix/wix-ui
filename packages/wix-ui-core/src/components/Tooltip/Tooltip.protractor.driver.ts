import {browser, ElementFinder} from 'protractor';
import {popoverDriverFactory} from '../../baseComponents/Popover/Popover.protractor.driver';
import {ILocation} from 'protractor/node_modules/@types/selenium-webdriver';
export {ILocation};

export const tooltipDriverFactory = (component: ElementFinder) => {
  const popoverDriver = popoverDriverFactory(component);
  return Object.assign(
    {},
    popoverDriver, {
    getTooltipLocation: async () =>  popoverDriver.getContentElement().getWebElement().getLocation()
  });
};
