const getElement = element => element.querySelector('[data-hook="tooltip-element"]');
const getContent = element => element.querySelector('[data-hook="popover-content"]');

export const tooltipDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  getTargetElement: getElement,
  getContentElement: getContent,
  isTargetElementExists: () => !!getElement(element),
  isContentExists: () => !!getContent(element),
  onMouseEnter: () => eventTrigger.mouseEnter(getElement(element))
});
