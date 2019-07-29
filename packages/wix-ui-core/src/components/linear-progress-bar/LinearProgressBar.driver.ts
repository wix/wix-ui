import {
  BaseDriver,
  ComponentFactory,
  DriverFactory,
} from 'wix-ui-test-utils/driver-factory';
import {StylableDOMUtil} from '@stylable/dom-test-kit';
import style from './LinearProgressBar.st.css';
import {
  ProgressBarDataHooks,
  ProgressBarDataKeys,
  ProgressBarAriaKeys,
} from './DataHooks';

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
  /** Returns max value prop */
  getMaxValue(): number;
  /** Returns aria-valuenow prop */
  getAriaValueNow(): number;
  /** Returns aria-valuemax prop */
  getAriaValueMax(): number;
  /** Returns aria-valuemin prop */
  getAriaValueMin(): number;
  /** Returns role html attribute */
  getRoleAttribute(): string;
  /** Returns aria-valuetext prop */
  getAriaValueText(): string;
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
  const getDataAttribute = (key: string, parsingFunction?: Function) => {
    if (!element || !element.getAttribute(key)) {
      return null;
    }
    const value = element.getAttribute(key);
    return !!parsingFunction && parsingFunction instanceof Function
      ? parsingFunction(value)
      : value;
  };
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
    isCompleted: () => getValue() >= getDataAttribute(ProgressBarDataKeys.max),
    hasError: () => stylableDOMUtil.hasStyleState(element, 'error'),
    getNumericValue: () => getDataAttribute(ProgressBarDataKeys.value, Number),
    getMinValue: () => getDataAttribute(ProgressBarDataKeys.min, Number),
    getMaxValue: () => getDataAttribute(ProgressBarDataKeys.max, Number),
    getAriaValueNow: () =>
      getDataAttribute(ProgressBarAriaKeys.valuenow, Number),
    getAriaValueMax: () =>
      getDataAttribute(ProgressBarAriaKeys.valuemax, Number),
    getAriaValueMin: () =>
      getDataAttribute(ProgressBarAriaKeys.valuemin, Number),
    getRoleAttribute: () => getDataAttribute('role'),
    getAriaValueText: () => getDataAttribute(ProgressBarAriaKeys.valuetext),
  };

  return driver;
};
