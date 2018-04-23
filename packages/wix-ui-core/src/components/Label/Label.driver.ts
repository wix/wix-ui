import {StylableDOMUtil} from 'stylable/test-utils';
import styles from './Label.st.css';

export const labelDriverFactory = ({element, eventTrigger}) => {
  const utils = new StylableDOMUtil(styles, element);

  return {
    /** check if element exists */
    exists: () => !!element,
    /** get the label's text */
    getLabelText: () => element.innerHTML,
    /** get the id of the component */
    getId: () => element.getAttribute('id'),
    /** get the "for" attribute of the component */
    getForAttribute: () => element.getAttribute('for'),
    /** click the label */
    click: () => eventTrigger.click(element),
    /** send key down on the label */
    keyDown: key => eventTrigger.keyDown(element, {key}),
    /** returns true if the label is in ellipsis state */
    hasEllipsis: () => utils.hasStyleState(element, 'ellipsis')
  };
};
