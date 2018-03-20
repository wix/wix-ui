import {ComponentFactory} from 'wix-ui-test-utils/driver-factory';
import {inputDriverFactory} from '../../components/Input/Input.driver';
import {FIELD} from './';

// Typescript was yelling at using ComponentFactory<TimePicker> for some reason and this makes it go away
export interface TimePickerShell {
  increment: Function;
  decrement: Function;
}

export const timePickerDriverFactory = ({element, eventTrigger, componentInstance}: ComponentFactory<TimePickerShell>) => {
  const timePickerInput = inputDriverFactory({element, eventTrigger});

  return {
    /** checks if element exists */
    exists: () => !!element,
    /** returns a boolean indicating if the timePicker is disabled */
    isDisabled: () => timePickerInput.isDisabled(),
    /** returns the input type attribute */
    getInputType: () => timePickerInput.getInput().type,
    /** returns the value (corresponds to state.value) */
    getValue: () => timePickerInput.getValue(),

    /** calls the increment function on the timePicker component */
    increment: (field?: FIELD) => componentInstance.increment(field),
    /** calls the decrement function on the timePicker component */
    decrement: (field?: FIELD) => componentInstance.decrement(field),
    /** simulates a keyDown event on the input element */
    keyDown: key => timePickerInput.keyDown(key),
    /** simulates a focus event on the input element */
    focus: () => timePickerInput.focus(),
    /** simulates a blur event on the input element */
    blur: () => timePickerInput.blur(),

    /** returns elements innerHtml */
    styles: {
      /** returns elements display css property */
      getRootDisplay: () => window.getComputedStyle(element).display,
      /** returns elements border-radius css property */
      getBorderRadius: () => window.getComputedStyle(element.querySelector('.outerLabel')).borderRadius
    }
  };
};
