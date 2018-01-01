const getElement = element => element.querySelector('[data-hook="tooltip-element"]');
const getContent = element => element.querySelector('[data-hook="popover-content"]');

export const tooltipDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  isTargetElementExists: () => !!getElement(element),
  isContentExists: () => !!getContent(element),
  mouseEnter: () => eventTrigger.mouseEnter(element)
});
