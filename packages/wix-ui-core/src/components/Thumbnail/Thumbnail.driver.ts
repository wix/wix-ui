import {StylableDOMUtil} from 'stylable/test-utils';
import style from './Thumbnail.st.css';

export const thumbnailDriverFactory = ({element, eventTrigger}) => {
  const stylableDOMUtil = new StylableDOMUtil(style);
  const selectedIcon = element.querySelector('[data-hook="selected-icon"]');

  return {
    /** checks if the element exists */
    exists: () => !!element,
    /** checks if the selected icon element exists */
    hasSelectedIcon: () => window.getComputedStyle(selectedIcon).getPropertyValue('display') !== 'none',
    /** triggers a click event on the element */
    click: () => eventTrigger.click(element),
    /** check if component is selected */
    isSelected: () => stylableDOMUtil.hasStyleState(element, 'selected'),
    /** returns the components's children */
    getContent: () => element.childNodes[0],
    /** returns the components's selected icon */
    getSelectedIcon: () => selectedIcon.childNodes[0],
    /** check if component is disabled */
    isDisabled: () => stylableDOMUtil.hasStyleState(element, 'disabled'),
  };
};
