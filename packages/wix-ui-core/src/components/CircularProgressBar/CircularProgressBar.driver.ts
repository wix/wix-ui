import { BaseDriver, ComponentFactory, DriverFactory } from 'wix-ui-test-utils/driver-factory';
import { StylableDOMUtil } from 'stylable/test-utils';
import style from './CircularProgressBar.st.css';

export interface CircularProgressBarDriver extends BaseDriver {
  /** Returns boolean that indicates if the success icon exists */
  isSuccessIconDisplayed: () => boolean;
  /** Returns boolean that indicates if the error icon exists */
  isErrorIconDisplayed: () => boolean;
  /** Returns boolean that indicates if the progress percentages text exists */
  isPercentagesProgressDisplayed: () => boolean;
  /** Get the progress percentages value */
  getValue: () => string;
  /** Returms true if has progress completed (value is 100) */
  isCompleted: () => boolean;
  /** Returms true if has error */
  hasError: () => boolean;
}

export const circularProgressBarDriverFactory: DriverFactory<CircularProgressBarDriver> = ({ element }: ComponentFactory) => {
  const stylableDOMUtil = new StylableDOMUtil(style);

  const getElement = dataHook => element.querySelector(`[data-hook="${dataHook}"]`)
  const getValue = () => !element ? null : getElement('progress-indicator').innerHTML;

  const driver = {
    exists: () => !!element,
    isSuccessIconDisplayed: () => !!getElement('success-icon'),
    isErrorIconDisplayed: () => !!getElement('error-icon'),
    isPercentagesProgressDisplayed: () => !!getElement('progress-indicator'),
    getValue: () => getValue(),
    isCompleted: () => getValue() === '100',
    hasError: () => stylableDOMUtil.hasStyleState(element, 'error'),
  }

  return driver;
};
