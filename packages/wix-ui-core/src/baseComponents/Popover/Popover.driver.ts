const getTargetElement = element => element.querySelector('[data-hook="popover-element"]');
const getContentElement = element => element.querySelector('[data-hook="popover-content"]');
const getArrowDriver = element => element.querySelector('[data-hook="popover-arrow"]');
export const popoverDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  getTargetElement: () => getTargetElement(element),
  getContentElement: () => getContentElement(element),
  isElementExists: () => !!getTargetElement(element),
  isContentExists: () => !!getContentElement(element),
  mouseEnter: () => eventTrigger.mouseEnter(element),
  mouseLeave: () => eventTrigger.mouseLeave(element),
  getArrow: () => getArrowDriver(element),
  getArrowClasses: () => getArrowDriver(element).className
});
