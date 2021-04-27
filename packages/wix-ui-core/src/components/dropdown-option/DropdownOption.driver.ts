import { StylableDOMUtil } from '@stylable/dom-test-kit';
import * as styles from './DropdownOption.st.css';

export const dropdownOptionDriverFactory = ({ element, eventTrigger }) => {
  const domUtils = new StylableDOMUtil(styles, element);
  return {
    exists: () => !!element,
    click: () => element && eventTrigger.click(element),
    mouseEnter: () => element && eventTrigger.mouseEnter(element),
    mouseLeave: () => element && eventTrigger.mouseLeave(element),
    className: () => element && element.className,
    isHovered: () => element && domUtils.hasStyleState(element, 'hovered'),
    isSelected: () => element && domUtils.hasStyleState(element, 'selected'),
    isDisabled: () => element && domUtils.hasStyleState(element, 'disabled'),
    isSelectable: () =>
      element && domUtils.hasStyleState(element, 'selectable'),
    getText: () => element && element.textContent,
    getElement: () => element,
    getHighlightedStrings: () => {
      const highlightedElements: HTMLElement[] = Array.from(
        element.querySelectorAll(`.${styles.classes.highlight}`),
      );
      return highlightedElements.map((el: HTMLElement) => el.innerHTML);
    },
  };
};
