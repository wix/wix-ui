import {ComponentFactory} from 'wix-ui-test-utils/driver-factory';
import {PopoverType} from './';

const getTargetElement = (element: Element | undefined) => element.querySelector('[data-hook="popover-element"]');
const getContentElement = (element: Element | undefined) => element.querySelector('[data-hook="popover-content"]');
const getArrowElement = (element: Element | undefined) => element.querySelector('[data-hook="popover-arrow"]');

export const popoverDriverFactory = ({element, eventTrigger}: ComponentFactory<PopoverType>) => ({
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
