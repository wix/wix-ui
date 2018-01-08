import {browser} from 'protractor';

const hover = async element => await browser.actions().mouseMove(element).perform();
const getElement = component => component.$('[data-hook="tooltip-element"]');
const getTooltip = component => component.$('[data-hook="popover-content"]');

export const tooltipDriverFactory = component => ({
  element: () => component,
  getElementText: () => getElement(component).getText(),
  getTooltipText: () => getTooltip(component).getText(),
  isTooltipExists: () => getTooltip(component).isPresent(),
  onMouseOver: () => hover(getElement(component)),
  onMouseLeave: () => hover({x: 100, y: 100})
});
