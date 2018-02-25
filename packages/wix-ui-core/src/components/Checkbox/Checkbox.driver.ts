import {StylableDOMUtil} from 'stylable/test-utils';
import styles from './Checkbox.st.css';

const utils = new StylableDOMUtil(styles);
const hasStyleState = (element, state) => utils.hasStyleState(element, state);

export const checkboxDriverFactory = ({element, eventTrigger}) => {
  const getCheckboxStyle = () => window.getComputedStyle(element);

  return {
    /** returns the element */
    element: () => element,
    /** checks if element exists */
    exists: () => !!element,
    /** click on the element */
    click: () => eventTrigger.click(element),
    /** trigger mouseenter on the element */
    mouseEnter: () => eventTrigger.mouseEnter(element),
    /** trigger mouseleave on the element */
    mouseLeave: () => eventTrigger.mouseLeave(element),
    /** trigger focus on the element */
    focus: () => eventTrigger.focus(element.querySelector('[data-hook="NATIVE_CHECKBOX"]')),
    /** checks if the tickmark exists, i.e. the checkbox is checked */
    isChecked: () => hasStyleState(element, 'checked'),
    /** returns true if the element has indeterminate state */
    isIndeterminate: () => hasStyleState(element, 'indeterminate'),
    /** returns if the element is disabled */
    isDisabled: () => hasStyleState(element, 'disabled'),
    /** returns the checkbox children */
    children: () => element.querySelectorAll('[data-hook="CHECKBOX_CHILD_CONTAINER"]'),
    /** returns the checkbox tickmark */
    tickmark: () => element.querySelector('[data-hook="CHECKBOX_BOX"]').firstChild,
    /** returns the checkbox native input */
    input: () => element.querySelector('[data-hook="NATIVE_CHECKBOX"]'),
    /** returns true if the element has error state */
    hasErrorState: () => hasStyleState(element, 'error'),
    /** returns true if the element has focus state */
    hasFocusState: () => hasStyleState(element, 'focus'),
    /** returns true if the element has error state */
    hasReadOnlyState: () => hasStyleState(element, 'readonly'),
  };
};
