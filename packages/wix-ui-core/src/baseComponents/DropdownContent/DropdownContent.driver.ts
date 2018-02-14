import {ComponentFactory} from 'wix-ui-test-utils';
import {isAttributeExists} from 'wix-ui-test-utils/vanilla';
import {DropdownContent} from './';

const getOptionAt = (element: Element, index: number) => element.querySelectorAll('[data-hook="option"]')[index];

export const dropdownContentDriverFactory = ({element, eventTrigger}: ComponentFactory<DropdownContent>) => ({
  exists: () => !!element,
  optionAt: (index: number) => {
    const option = element ? getOptionAt(element, index) : null;
    return {
      click: () => option && eventTrigger.click(option),
      isHovered: () => option && isAttributeExists(option, attribute => attribute.name.includes('hover') && attribute.value === 'true')
    };
  }
});
