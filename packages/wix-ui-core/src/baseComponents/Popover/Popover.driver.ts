const getTargetElement = (element: Element | undefined) => element && element.querySelector('[data-hook="popover-element"]');
const getContentElement = (element: Element | undefined) => element && element.querySelector('[data-hook="popover-content"]');
const getArrowElement = (element: Element | undefined) => element && element.querySelector('[data-hook="popover-arrow"]');

export const popoverDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  getTargetElement: () => getTargetElement(element),
  getContentElement: () => getContentElement(element),
  isTargetElementExists: () => !!getTargetElement(element),
  isContentElementExists: () => !!getContentElement(element),
  mouseEnter: () => eventTrigger.mouseEnter(element),
  mouseLeave: () => eventTrigger.mouseLeave(element),
  click: () => eventTrigger.click(element),
  getArrowOffset: () => {
    const {top, left, right, bottom} = (getArrowElement(element) as HTMLElement).style;
    return {top, left, right, bottom};
  }
});
