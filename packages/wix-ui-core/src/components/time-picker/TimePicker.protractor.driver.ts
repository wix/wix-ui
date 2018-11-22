import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';
import {browser, protractor} from 'protractor';
import {mouseEnter} from 'wix-ui-test-utils/protractor';
import {inputDriverFactory} from '../input/Input.protractor.driver';

export interface TimePickerDriver extends BaseDriver {
  focus: () => Promise<void>;
  blur: () => Promise<void>;
  mouseEnter: () => Promise<void>;
  pressKeyArrowRight: () => Promise<void>;
  pressKeyArrowLeft: () => Promise<void>;
  clickTickerUp: () => Promise<void>;
  clickTickerDown: () => Promise<void>;
  getValue: () => Promise<string>;
}

export const timePickerDriverFactory: DriverFactory<TimePickerDriver> = component => {
  const inputDriver = inputDriverFactory(component)
  const tickerUp = component.$('[data-hook="ticker-button-up"]');
  const tickerDown = component.$('[data-hook="ticker-button-down"]');

  return {
    /** returns the component element */
    element: () => component,
    /** focuses the component's input element */
    focus: async () => inputDriver.focus(),
    blur: async () => (
      browser
        .actions()
        .mouseMove(component, {x: -2, y: -2})
        .mouseDown()
         .perform()
    ),
    mouseEnter: async () => mouseEnter(component),
    pressKeyArrowRight: () => inputDriver.pressKey(protractor.Key.ARROW_RIGHT),
    pressKeyArrowLeft: () => inputDriver.pressKey(protractor.Key.ARROW_LEFT),
    clickTickerUp: async () => tickerUp.click(),
    clickTickerDown: async () => tickerDown.click(),
    getValue: () => inputDriver.getText(),
  }
};
