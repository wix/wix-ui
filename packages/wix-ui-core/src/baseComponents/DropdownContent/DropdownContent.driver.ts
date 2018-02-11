import {ComponentFactory} from 'wix-ui-test-utils/driver-factory';
import {isAttributeExists} from 'wix-ui-test-utils/vanilla';
import {DropdownContent} from './';

const getOptionAt = (element, index) => element.querySelectorAll('[data-hook="option"]')[index];

export const dropdownContentDriverFactory = ({element, componentInstance, eventTrigger}: ComponentFactory<DropdownContent>) => ({
  exists: () => !!element,
  onKeyDown: key => componentInstance.onKeyDown(key),
  optionAt: index => {
    const option = getOptionAt(element, index);
    return {
      click: () => eventTrigger.click(option),
      isHovered: () => isAttributeExists(option, attribute => attribute.name.includes('hover') && attribute.value === 'true')
    };
  }
});
