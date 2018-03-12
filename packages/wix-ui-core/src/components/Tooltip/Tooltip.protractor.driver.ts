import {browser} from 'protractor';
import {popoverDriverFactory} from '../../baseComponents/Popover/Popover.protractor.driver';

export const tooltipDriverFactory = component => {
  const hover = async element => await browser.actions().mouseMove(element).perform();
  const popoverDriver = popoverDriverFactory(component);
  return Object.assign(
    {},
    popoverDriver, {
    getTooltipLocation: async () => (await popoverDriver.getContentElement().getWebElement()).getLocation()
  });
};
