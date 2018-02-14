import {ComponentFactory} from 'wix-ui-test-utils';
import {DropdownComponent} from './Dropdown';
import {DropdownContent} from '../DropdownContent';
import {dropdownContentDriverFactory} from '../DropdownContent/DropdownContent.driver';

const getElement = (element: Element | undefined) => element && element.querySelector('[data-hook="popover-element"]');
const getContent = (element: Element | undefined) => element && element.querySelector('[data-hook="popover-content"]');

export const dropdownDriverFactory = (args: ComponentFactory<any>) => {
  const {element, eventTrigger} = args;
  const dropdownContentDriver =  dropdownContentDriverFactory(args);

  return {
    exists: () => !!element,
    isTargetElementExists: () => !!getElement(element),
    isContentElementExists: () => !!getContent(element),
    mouseEnter: () => element && eventTrigger.mouseEnter(element),
    mouseLeave: () => element && eventTrigger.mouseLeave(element),
    click: () => {
      if (element) {
        const targetElment = getElement(element);
        targetElment && eventTrigger.click(targetElment);
      }
    },
    targetElement: () => getElement(element),
    clickOptionAt: (index: number) => dropdownContentDriver.optionAt(index).click()
  };
};
