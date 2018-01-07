import {dropdownContentDriverFactory} from './DropdownContent/DropdownContent.driver';

const getElement = element => element.querySelector('[data-hook="dropdown-element"]');
const getContent = element => element.querySelector('[data-hook="popover-content"]');

export const dropdownDriverFactory = (args) => {
  const {element, eventTrigger} = args;
  const dropdownContentDriver =  dropdownContentDriverFactory(args);

  return {
    exists: () => !!element,
    isTargetElementExists: () => !!getElement(element),
    isContentElementExists: () => !!getContent(element),
    mouseEnter: () => eventTrigger.mouseEnter(element),
    mouseLeave: () => eventTrigger.mouseLeave(element),
    click: () => eventTrigger.click(getElement(element)),
    targetElement: () => getElement(element),
    clickOptionAt: index => dropdownContentDriver.optionAt(index).click()
  };
};
