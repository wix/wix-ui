import {StylableDOMUtil} from 'stylable/test-utils';
import style from './Label.st.css';

export const labelDriverFactory = ({element, eventTrigger}) => {
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    /** check if element exists */
    exists: () => !!element,
    /** get the label's text */
    getLabelText: () => element.innerHTML,
    /** get the id of the component */
    getId: () => element.getAttribute('id'),
    /** get the "for" attribute of the component */
    getForAttribute: () => element.getAttribute('for'),
    /** true if disabled */
    isDisabled: () => stylableDOMUtil.hasStyleState(element, 'disabled'),
    /** click the label */
    click: () => eventTrigger.click(element),
    /** send key down on the label */
    keyDown: key => eventTrigger.keyDown(element, {key})
  };
};
