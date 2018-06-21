import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';
import {browser, protractor} from 'protractor';
import {mouseEnter} from "wix-ui-test-utils/protractor";
import {inputDriverFactory} from "../Input/Input.protractor.driver";

export interface TimePickerDriver extends BaseDriver {
  focus: () => Promise<void>;
  blur: () => Promise<void>;
  mouseEnter: () => Promise<void>;
  pressKeyArrowRight: () => Promise<void>;
  pressKeyArrowLeft: () => Promise<void>;
}

export const timePickerDriverFactory: DriverFactory<TimePickerDriver> = component => {
  const inputDriver = inputDriverFactory(component)

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
  }
};
