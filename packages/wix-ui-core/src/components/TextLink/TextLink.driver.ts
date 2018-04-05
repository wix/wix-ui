import {StylableDOMUtil} from 'stylable/test-utils';
import style from './TextLink.st.css';

export const textLinkDriverFactory = ({element, eventTrigger}) => {
  const styleUtil = new StylableDOMUtil(style);

  return {
    /** checks if element exists */
    exists: () => !!element,
    /** returns true if style state applied to the TextLink */
    hasStyleState: stateName => styleUtil.hasStyleState(element, stateName),
    /** click on the element */
    click: () => eventTrigger.click(element),
    /** focuses the TextLink */
    focus: () => eventTrigger.focus(element),
    /** returns anchor element */
    getElement: () => element,
    /** returns elements textContent */
    getTextContent: () => element.textContent,
    /** get elements href attribute */
    getHref: () => element.href
  };
};
