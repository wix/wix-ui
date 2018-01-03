const getElement = element => element.querySelector('[data-hook="dropdown-element"]');
const getContent = element => element.querySelector('[data-hook="popover-content"]');
const getOptionAt = (element, index) => element.querySelectorAll('[data-hook="options-container"] > div')[index];

export const dropdownDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  isTargetElementExists: () => !!getElement(element),
  isContentElementExists: () => !!getContent(element),
  mouseEnter: () => eventTrigger.mouseEnter(element),
  mouseLeave: () => eventTrigger.mouseLeave(element),
  click: () => eventTrigger.click(getElement(element)),
  targetElement: () => getElement(element),
  clickOptionAt: index => eventTrigger.click(getOptionAt(element, index))
});
