import {inputDriverFactory} from '../../components/Input/Input.driver';

export const timePickerDriverFactory = ({element, eventTrigger}) => {
  const inputDriver = inputDriverFactory({element, eventTrigger});

  return {
    /** checks if element exists */
    exists: () => !!element,

    /** returns the time picker element */
    element: () => element,

    /** returns the input element */
    getInputElement: () => inputDriver.getInput(),

    /** returns inline style width of TimePicker */
    getInlineStyle: () => window.getComputedStyle(inputDriver.getInput().parentNode),

    /** returns a boolean indicating if the timePicker is disabled */
    isDisabled: () => inputDriver.isDisabled(),

    /** returns the input type attribute */
    getInputType: () => inputDriver.getInput().type,

    /** returns the value (corresponds to state.value) */
    getValue: () => inputDriver.getValue(),

    /** sets the value of the time picker */
    setValue: value => inputDriver.setValue(value),

    /** simulates a keyDown event on the input element */
    keyDown: key => inputDriver.keyDown(key),

    /** simulates a focus event on the input element */
    focus: () => inputDriver.focus(),

    /** simulates a blur event on the input element */
    blur: () => inputDriver.blur(),

    /** returns the ticker group element */
    getTickers: () => inputDriver.getSuffix(),

    /** clicks on the ticker up button */
    clickTickerUp: () => eventTrigger.click(inputDriver.getSuffix().querySelector('[data-hook="ticker-button-up"]')),

    /** clicks on the ticker down button */
    clickTickerDown: () => eventTrigger.click(inputDriver.getSuffix().querySelector('[data-hook="ticker-button-down"]'))
  };
};
