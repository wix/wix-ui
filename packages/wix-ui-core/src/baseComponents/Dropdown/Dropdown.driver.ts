import {ComponentFactory} from 'wix-ui-test-utils';
import {dropdownContentDriverFactory} from '../DropdownContent/DropdownContent.driver';

const getElement = (element: Element | undefined) => (element).querySelector('[data-hook="popover-element"]');
const getContent = (element: Element | undefined) => element.querySelector('[data-hook="popover-content"]');

export const dropdownDriverFactory = (args: ComponentFactory<any>) => {
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
    clickOptionAt: (index: number) => dropdownContentDriver.optionAt(index).click()
  };
};
