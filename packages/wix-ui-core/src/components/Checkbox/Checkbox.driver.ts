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
    /** returns elements type attribute */
    getType: () => element.getAttribute('type'),
    /** checks if the tickmark exists, i.e. the checkbox is checked */
    isChecked: () => !!element.querySelector('[data-hook="CHECKBOX_TICKMARK"]'),
    /** returns elements textContent */
    getTextContent: () => element.textContent,
    /** returns the checkbox children */
    children: () => element.querySelectorAll('[data-hook="CHECKBOX_CHILD_CONTAINER"]'),
    /** returns the checkbox tickmark */
    tickmark: () => element.querySelector('[data-hook="CHECKBOX_TICKMARK"]'),
    /** returns the indeterminate icon */
    indeterminateMark: () => element.querySelector('[data-hook="CHECKBOX_INDETERMINATE"]'),
    /** returns a boolean indicating whether the checkbox is in indeterminate state */
    isIndeterminate: () => !!element.querySelector('[data-hook="CHECKBOX_INDETERMINATE"]'),
    /** returns the checkbox native input */
    input: () => element.querySelector('[data-hook="NATIVE_CHECKBOX"]'),
    /** returns if the element is disabled */
    isDisabled: () => element.getAttribute('disabled') === '',
    /** returns true if the element has error state */
    hasErrorState: () => hasStyleState(element, 'error'),
    /** returns true if the element has indeterminate state */
    hasIndeterminateState: () => hasStyleState(element, 'indeterminate'),
    /** returns true if the element has focus state */
    hasFocusState: () => hasStyleState(element, 'focus'),
    /** returns true if the element has disabled state */
    hasDisabledState: () => hasStyleState(element, 'disabled'),
    /** returns true if the element has error state */
    hasReadOnlyState: () => hasStyleState(element, 'readonly'),
    styles: {
      /** returns elements min-width css property */
      getMinWidth: () => getCheckboxStyle().minWidth,
      /** returns elements width css property */
      getWidth: () => getCheckboxStyle().width,
      /** returns elements height css property */
      getHeight: () => getCheckboxStyle().height,
      /** returns elements padding css property */
      getPadding: () => getCheckboxStyle().padding,
      /** returns elements border-radius css property */
      getBorderRadius: () => getCheckboxStyle().borderRadius,
    }
  };
};
