import {StylableDOMUtil} from 'stylable/test-utils';
import style from './Divider.st.css';

export const dividerDriverFactory = ({element}) => {
  const domUtils = new StylableDOMUtil(style, element);
  return {
    /** checks if the element exists */
    exists: () => !!element,

    /** checks if the divider is vertical */
    isVertical: () => element && domUtils.hasStyleState(element, 'vertical'),

    /** gets text content */
    textContent: () => element.textContent
  };
};
