import {StylableDOMUtil} from 'stylable/test-utils';
import styles from './Label.st.css';

export const labelDriverFactory = ({element, eventTrigger}) => {
  const stylableDOMUtil = new StylableDOMUtil(styles, element);

  return {
    /** check if element exists */
    exists: () => !!element,
    /** get the label's text */
    getLabelText: () => element.textContent,
    /** get the id of the component */
    getId: () => element.getAttribute('id'),
    /** get the "for" attribute of the component */
    getForAttribute: () => element.getAttribute('for'),
    /** true if disabled */
    isDisabled: () => stylableDOMUtil.hasStyleState(element, 'disabled'),
    /** click the label */
    click: () => eventTrigger.click(element),
    /** send key down on the label */
    keyDown: key => eventTrigger.keyDown(element, {key}),
    /** returns true if the label is in ellipsis state */
    hasEllipsis: () => stylableDOMUtil.hasStyleState(element, 'ellipsis')
  };
};
