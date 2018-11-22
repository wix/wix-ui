import {StylableDOMUtil} from '@stylable/dom-test-kit';
import style from './Thumbnail.st.css';
import {BaseDriver, DriverFactory} from 'wix-ui-test-utils/driver-factory';

export interface ThumbnailDriver extends BaseDriver {
  hasSelectedIcon: () => boolean;
  click: () => void;
  isSelected: () => boolean;
  getContent: () => HTMLElement;
  getSelectedIcon: () => HTMLElement;
  isDisabled: () => boolean;
}

export const thumbnailDriverFactory: DriverFactory<ThumbnailDriver> = ({element, eventTrigger}) => {
  const stylableDOMUtil = new StylableDOMUtil(style);
  const getSelectedIconWrapper = () => element.querySelector('[data-hook="selected-icon"]');

  return {
    /** checks if the element exists */
    exists: () => !!element,
    /** checks if the selected icon element exists */
    hasSelectedIcon: () => !!getSelectedIconWrapper(),
    /** triggers a click event on the element */
    click: () => eventTrigger.click(element),
    /** check if component is selected */
    isSelected: () => stylableDOMUtil.hasStyleState(element, 'selected'),
    /** returns the components's children */
    getContent: () => <HTMLElement>element.childNodes[0],
    /** returns the components's selected icon */
    getSelectedIcon: () => <HTMLElement>getSelectedIconWrapper().childNodes[0],
    /** check if component is disabled */
    isDisabled: () => stylableDOMUtil.hasStyleState(element, 'disabled'),
  };
};
