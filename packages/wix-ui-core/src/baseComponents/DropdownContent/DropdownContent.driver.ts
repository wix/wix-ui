import {ComponentFactory} from 'wix-ui-test-utils';
import {DropdownContent} from './';

const getOptionAt = (element, index) => element.querySelectorAll('[data-hook="option"]')[index];

export const dropdownContentDriverFactory = ({element, componentInstance, eventTrigger}: ComponentFactory<DropdownContent>) => ({
  exists: () => !!element,
  onKeyDown: key => componentInstance.onKeyDown({key} as React.KeyboardEvent<HTMLElement>),
  optionAt: index => {
    const option = getOptionAt(element, index);
    return {
      click: () => eventTrigger.click(option),
      containsClass: className => option.className.includes(className)
    };
  }
});
