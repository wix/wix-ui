import {browser} from 'protractor';

const hover = async element => await browser.actions().mouseMove(element).perform();
const getElement = component => component.$('[data-hook="popover-element"]');
const getTooltip = component => component.$('[data-hook="popover-content"]');
const getTooltipWebElement = async component => await getTooltip(component).getWebElement();
export const tooltipDriverFactory = component => ({
  element: () => component,
  getTooltipLocation: async () => (await getTooltipWebElement(component)).getLocation(),
  getElementText: () => getElement(component).getText(),
  getTooltipText: async () => {
    const elem = await getTooltip(component).getWebElement();
    return await elem.getAttribute('innerText');
  },
  isTooltipExists: () => getTooltip(component).isPresent(),
  onMouseOver: () => hover(getElement(component)),
  onMouseLeave: () => hover({x: 1000, y: 1000})
});
