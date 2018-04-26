import {StylableDOMUtil} from 'stylable/test-utils';
import styles from './DropdownOption.st.css';

export const dropdownOptionDriverFactory = ({element, eventTrigger}) => {
  const domUtils = new StylableDOMUtil(styles, element);
  return {
    exists: () => !!element,
    click: () => element && eventTrigger.click(element),
    mouseEnter: () => element && eventTrigger.mouseEnter(element),
    className: () => element && element.className,
    isHovered: () => element && domUtils.hasStyleState(element, 'hovered'),
    isSelected: () => element && domUtils.hasStyleState(element, 'selected'),
    isDisabled: () => element && domUtils.hasStyleState(element, 'disabled'),
    getText: () => element && element.textContent,
    getElement: () => element,
  };
};
