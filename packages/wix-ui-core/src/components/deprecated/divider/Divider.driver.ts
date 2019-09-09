import { StylableDOMUtilCompat } from '@stylable/dom-test-kit';
import style from './Divider.st.css';

export const dividerDriverFactory = ({ element }) => {
  const domUtils = new StylableDOMUtilCompat(style, element);
  return {
    /** checks if the element exists */
    exists: () => !!element,

    /** checks if the divider is vertical */
    isVertical: () => element && domUtils.hasStyleState(element, 'vertical'),

    /** gets text content */
    textContent: () => element.textContent,
  };
};
