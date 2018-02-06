import {DropdownOption} from './';
import {ComponentFactory, isAttributeExists} from 'wix-ui-test-utils';

export const dropdownOptionDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  click: () => eventTrigger.click(element),
  mouseEnter: () => eventTrigger.mouseEnter(element),
  className: () => element.className,
  isHovered: () => isAttributeExists(element, attribute => attribute.name.includes('hover') && attribute.value === 'true'),
  isSelected: () => isAttributeExists(element, attribute => attribute.name.includes('select') && attribute.value === 'true'),
  isDisabled: () => isAttributeExists(element, attribute => attribute.name.includes('disabled') && attribute.value === 'true')
});
