const getTargetElement = element => element.querySelector('[data-hook="popover-element"]');
const getContentElement = element => element.querySelector('[data-hook="popover-content"]');
const getArrowElement = element => element.querySelector('[data-hook="popover-arrow"]');

export const popoverDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  getTargetElement: () => getTargetElement(element),
  getContentElement: () => getContentElement(element),
  isElementExists: () => !!getTargetElement(element),
  isContentExists: () => !!getContentElement(element),
  mouseEnter: () => eventTrigger.mouseEnter(element),
  mouseLeave: () => eventTrigger.mouseLeave(element),
  getArrowOffset: () => {
    const {top, left, right, bottom} = getArrowElement(element).style;
    return {top, left, right, bottom};
  }
});
