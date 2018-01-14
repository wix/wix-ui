const getTargetElement = element => element.querySelector('[data-hook="popover-element"]');
const getContentElement = element => element.querySelector('[data-hook="popover-content"]');

export const popoverDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  getTargetElement: () => getTargetElement(element),
  getContentElement: () => getContentElement(element),
  isElementExists: () => !!getTargetElement(element),
  isContentExists: () => !!getContentElement(element),
  mouseEnter: () => eventTrigger.mouseEnter(element),
  mouseLeave: () => eventTrigger.mouseLeave(element),
  getArrowClasses: () => element.querySelector('[data-hook="popover-arrow"]').className
});
