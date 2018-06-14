import { BaseDriver, ComponentFactory, DriverFactory } from 'wix-ui-test-utils/driver-factory';
import {StylableDOMUtil} from 'stylable/test-utils';
import style from './LinearProgressBar.st.css';

export interface LinearProgressBarDriver extends BaseDriver {
  /** Get the width of the foreground bar (the progress) */
  getWidth: () => string;
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

export const linearProgressBarDriverFactory: DriverFactory<LinearProgressBarDriver> = ({ element }: ComponentFactory) => {
  const stylableDOMUtil = new StylableDOMUtil(style);
  
  const getElement = dataHook => element.querySelector(`[data-hook="${dataHook}"]`)
  const getValue = () => !element ? null : getElement('progress-percentages').querySelector('span').innerHTML;

  const driver = {
    exists: () => !!element,
    getWidth: () => {
      const el = getElement('progressbar-foreground') as HTMLElement;
      return el ? el.style.width : '0';
    },
    isSuccessIconDisplayed: () => !!getElement('success-icon'),
    isErrorIconDisplayed: () => !!getElement('error-icon'),
    isPercentagesProgressDisplayed: () => !!getElement('progress-percentages'),
    getValue: () => getValue(),
    isCompleted: () => getValue() === '100',
    hasError: () => stylableDOMUtil.hasStyleState(element, 'error'),
  }

  return driver;
};
