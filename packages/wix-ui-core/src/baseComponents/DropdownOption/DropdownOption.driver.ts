import {DropdownOptionType, DropdownOptionProps} from './';
import {isAttributeExists} from 'wix-ui-test-utils/vanilla';

export const dropdownOptionDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  click: () => element && eventTrigger.click(element),
  mouseEnter: () => element && eventTrigger.mouseEnter(element),
  className: () => element && element.className,
  isHovered: () => element && isAttributeExists(element, (attribute: Attr) => attribute.name.includes('hover') && attribute.value === 'true'),
  isSelected: () => element && isAttributeExists(element, (attribute: Attr) => attribute.name.includes('select') && attribute.value === 'true'),
  isDisabled: () => element && isAttributeExists(element, (attribute: Attr) => attribute.name.includes('disabled') && attribute.value === 'true')
});
