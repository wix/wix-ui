import {StylableDOMUtil} from 'stylable/test-utils';
import styles from './Checkbox.st.css';

export const checkboxDriverFactory = ({element, eventTrigger}) => {
  const utils = new StylableDOMUtil(styles, element);
  const hasStyleState = state => utils.hasStyleState(element, state);
  const input = utils.select('.nativeCheckbox') as HTMLInputElement;

  return {
    /** returns the element */
    element: () => element,
    /** checks if element exists */
    exists: () => !!element,
    /** click on the element */
    click: () => {
     // jsdom doesn't simulate checkboxes well: checkbox.click() updates .checked even
      // if the component is controlled, it also doesn't generate onChange() and doesn't
      // respect .disabled
      if (!input.disabled && !input.readOnly) {
        eventTrigger.change(input);
      }
    },
    /** presses on the elemet */
    keyDown: (key: string) => eventTrigger.keyDown(input, {key}),
    /** trigger mouseenter on the element */
    mouseEnter: () => eventTrigger.mouseEnter(element),
    /** trigger mouseleave on the element */
    mouseLeave: () => eventTrigger.mouseLeave(element),
    /** trigger mousedown on the element */
    mouseDown: () => eventTrigger.mouseDown(element),
    /** trigger focus on the element */
    focus: () => eventTrigger.focus(utils.select('.nativeCheckbox')),
    /** checks if the tickmark exists, i.e. the checkbox is checked */
    isChecked: () => hasStyleState('checked'),
    /** returns true if the element has indeterminate state */
    isIndeterminate: () => hasStyleState('indeterminate'),
    /** returns if the element is disabled */
    isDisabled: () => hasStyleState('disabled'),
    /** returns the checkbox children */
    children: () => utils.select('.childContainer'),
    /** returns the checkbox tickmark */
    tickmark: () => utils.select('.box').firstElementChild,
    /** returns the checkbox native input */
    input: () => input,
    /** returns true if the element has error state */
    hasErrorState: () => hasStyleState('error'),
    /** returns true if the element has focus state */
    hasFocusState: () => hasStyleState('focus'),
    /** returns true if the element has error state */
    hasReadOnlyState: () => hasStyleState('readonly'),
  };
};
