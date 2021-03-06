import { StylableDOMUtil } from '@stylable/dom-test-kit';
import * as style from './Input.st.css';

export const inputDriverFactory = ({ element, eventTrigger }) => {
  const input = element && element.querySelector('input');
  const styleUtil = new StylableDOMUtil(style);

  return {
    /** checks if element exists */
    exists: () => !!element,

    hasStyleState: (stateName) => styleUtil.hasStyleState(element, stateName),

    /** get input element */
    getInput: () => input,

    /** get id */
    getId: () => input.getAttribute('id'),

    /** get value */
    getValue: () => input.value,

    /** get placeholder */
    getPlaceholder: () => input.placeholder,

    /** get prefix */
    getPrefix: () => input.previousSibling,

    /** get suffix */
    getSuffix: () => input.nextSibling,

    /** get autoComplete */
    getAutoComplete: () => input.getAttribute('autocomplete'),
    /** is disabled */
    isDisabled: () => input.disabled,

    /** is read only */
    isReadOnly: () => input.readOnly,

    /** set value */
    setValue: (value) => {
      input.value = value;
      eventTrigger.change(input, { target: { value } });
    },

    /** trigger focus */
    focus: () => eventTrigger.focus(input),

    /** trigger blur */
    blur: () => eventTrigger.blur(input),

    /** trigger keyDown */
    keyDown: (key) => eventTrigger.keyDown(input, { key }),
  };
};
