import {PopoverType} from './';

const getTargetElement = (element: Element | undefined) => element && element.querySelector('[data-hook="popover-element"]');
const getContentElement = (element: Element | undefined) => element && element.querySelector('[data-hook="popover-content"]');
const getArrowElement = (element: Element | undefined) => element && element.querySelector('[data-hook="popover-arrow"]');

export const popoverDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  getTargetElement: () => getTargetElement(element),
  getContentElement: () => getContentElement(element),
  isElementExists: () => !!getTargetElement(element),
  isContentExists: () => !!getContentElement(element),
  mouseEnter: () => element && eventTrigger.mouseEnter(element),
  mouseLeave: () => element && eventTrigger.mouseLeave(element),
  getArrowOffset: () => {
    const {top, left, right, bottom} = (getArrowElement(element) as HTMLElement).style;
    return {top, left, right, bottom};
  }
});
