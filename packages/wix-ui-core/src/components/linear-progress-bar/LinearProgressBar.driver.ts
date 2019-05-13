import {
  BaseDriver,
  ComponentFactory,
  DriverFactory,
} from 'wix-ui-test-utils/driver-factory';
import {StylableDOMUtil} from '@stylable/dom-test-kit';
import style from './LinearProgressBar.st.css';
import {ProgressBarDataHooks, ProgressBarDataKeys} from './DataHooks';

export interface LinearProgressBarDriver extends BaseDriver {
  /** Get the width of the foreground bar (the progress) */
  getWidth(): string;
  /** Returns boolean that indicates if the success icon exists */
  isSuccessIconDisplayed(): boolean;
  /** Returns boolean that indicates if the error icon exists */
  isErrorIconDisplayed(): boolean;
  /** Returns boolean that indicates if the progress percentages text exists */
  isPercentagesProgressDisplayed(): boolean;
  /** Get the progress percentages value */
  getValue(): string;
  /** Get the progress numeric value */
  getNumericValue(): number;
  /** Returns true if has progress completed (value is 100) */
  isCompleted(): boolean;
  /** Returns true if has error */
  hasError(): boolean;
  /** Returns min value prop */
  getMinValue(): number;
}

export const linearProgressBarDriverFactory: DriverFactory<
  LinearProgressBarDriver
> = ({element}: ComponentFactory) => {
  const stylableDOMUtil = new StylableDOMUtil(style);

  const getElement = dataHook =>
    element.querySelector(`[data-hook="${dataHook}"]`);
  const getValue = () =>
    !element
      ? null
      : getElement(ProgressBarDataHooks.progressPercentage).querySelector(
          'span'
        ).innerHTML;
  const getNumericValue = () =>
    !element ? null : +element.getAttribute(ProgressBarDataKeys.value);
  const getMinValue = () =>
    !element ? null : +element.getAttribute(ProgressBarDataKeys.min);
  const driver = {
    exists: () => !!element,
    getWidth: () => {
      const el = getElement(ProgressBarDataHooks.foreground) as HTMLElement;
      return el ? el.style.width : '0';
    },
    isSuccessIconDisplayed: () =>
      !!getElement(ProgressBarDataHooks.successIcon),
    isErrorIconDisplayed: () => !!getElement(ProgressBarDataHooks.errorIcon),
    isPercentagesProgressDisplayed: () =>
      !!getElement(ProgressBarDataHooks.progressPercentage),
    getValue: () => getValue(),
    isCompleted: () => getValue() === '100',
    hasError: () => stylableDOMUtil.hasStyleState(element, 'error'),
    getNumericValue,
    getMinValue,
  };

  return driver;
};
