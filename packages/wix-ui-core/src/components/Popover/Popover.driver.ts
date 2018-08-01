const queryDocumentOrElement = (element, query) => ((element && element.querySelectorAll(query)[0]) || document && document.querySelector(query));
const getTargetElement = (element: Element | undefined) => element && element.querySelectorAll('[data-hook="popover-element"]')[0];
const getContentElement = (element: Element | undefined) => queryDocumentOrElement(element, '[data-hook="popover-content"]');
const getArrowElement = (element: Element | undefined) => element && element.querySelectorAll('[data-hook="popover-arrow"]')[0];

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
  },
  inlineStyles: () => element.style,
  getElementId: () => element.id
});
