import {ComponentFactory} from 'wix-ui-test-utils';
import {FIELD} from './';

// Typescript was yelling at using ComponentFactory<TimePicker> for some reason and this makes it go away
export interface TimePickerShell {
  increment: Function;
  decrement: Function;
}

export const timePickerDriverFactory = ({element, eventTrigger, componentInstance}: ComponentFactory<TimePickerShell>) => {
  const timePicker = element as HTMLInputElement;

  return {
    /** checks if element exists */
    exists: () => !!element,
    /** returns a boolean indicating if the timePicker is disabled */
    isDisabled: () => timePicker.disabled,
    /** returns the input type attribute */
    getInputType: () => timePicker.type,
    /** returns the value (corresponds to state.value) */
    getValue: () => timePicker.value,

    /** calls the increment function on the timePicker component */
    increment: (field?: FIELD) => componentInstance.increment(field),
    /** calls the decrement function on the timePicker component */
    decrement: (field?: FIELD) => componentInstance.decrement(field),
    /** simulates a keyDown event on the input element */
    keyDown: key => eventTrigger.keyDown(timePicker, {key}),
    /** simulates a focus event on the input element */
    focus: () => eventTrigger.focus(timePicker),
    /** simulates a blur event on the input element */
    blur: () => eventTrigger.blur(timePicker),

    /** returns elements innerHtml */
    styles: {
      /** returns elements display css property */
      getRootDisplay: () => window.getComputedStyle(element).display,
      /** returns elements border-radius css property */
      getBorderRadius: () => window.getComputedStyle(element.querySelector('.outerLabel')).borderRadius
    }
  };
};
