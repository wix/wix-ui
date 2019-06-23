import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import {UniDriver, StylableUnidriverUtil} from 'wix-ui-test-utils/unidriver';
import styles from './LinearProgressBar.st.css';
import {ReactBase} from '../../../test/utils/unidriver/ReactBase';
import {
  ProgressBarDataHooks,
  ProgressBarDataKeys,
  ProgressBarAriaKeys,
} from './DataHooks';

export interface LinearProgressBarUniDriver extends BaseUniDriver {
  /** Get the width of the foreground bar (the progress) */
  getWidth(): Promise<string>;
  /** Returns Promise<boolean that indicates if the success icon exists */
  isSuccessIconDisplayed(): Promise<boolean>;
  /** Returns Promise<boolean that indicates if the error icon exists */
  isErrorIconDisplayed(): Promise<boolean>;
  /** Returns Promise<boolean that indicates if the progress percentages text exists */
  isPercentagesProgressDisplayed(): Promise<boolean>;
  /** Get the progress percentages value */
  getValue(): Promise<string>;
  /** Get the progress numeric value */
  getNumericValue(): Promise<number>;
  /** Returns true if has progress completed (value is 100) */
  isCompleted(): Promise<boolean>;
  /** Returns true if has error */
  hasError(): Promise<boolean>;
  /** Returns min value prop */
  getMinValue(): Promise<number>;
  /** Returns max value prop */
  getMaxValue(): Promise<number>;
  /** Returns aria-valuenow prop */
  getAriaValueNow(): Promise<number>;
  /** Returns aria-valuemin prop */
  getAriaValueMin(): Promise<number>;
  /** Returns aria-valuemax prop */
  getAriaValueMax(): Promise<number>;
  /** Returns role html attribute */
  getRoleAttribute(): Promise<string>;
}

export const linearProgressBarUniDriverFactory = (
  base: UniDriver
): LinearProgressBarUniDriver => {
  const byDataHook = dataHook => `[data-hook="${dataHook}"]`;
  const stylableUnidriverUtil = new StylableUnidriverUtil(styles);

  const getValue = async () => {
    if (!(await base.exists())) {
      return null;
    }
    return base
      .$(byDataHook(ProgressBarDataHooks.progressPercentage))
      .$('span')
      .text();
  };

  const getDataAttribute = async (key: string, parsingFunction?: Function) => {
    if (!(await base.exists()) || !(await base.attr(key))) {
      return null;
    }
    const value = await base.attr(key);
    return !!parsingFunction && parsingFunction instanceof Function
      ? parsingFunction(value)
      : value;
  };

  return {
    ...baseUniDriverFactory(base),
    getWidth: async () => {
      const bar = base.$(byDataHook(ProgressBarDataHooks.foreground));
      const reactBase = ReactBase(bar);
      return (await reactBase.getStyle()).width;
    },
    isSuccessIconDisplayed: () =>
      base.$(byDataHook(ProgressBarDataHooks.successIcon)).exists(),
    isErrorIconDisplayed: () =>
      base.$(byDataHook(ProgressBarDataHooks.errorIcon)).exists(),
    isPercentagesProgressDisplayed: () =>
      base.$(byDataHook(ProgressBarDataHooks.progressPercentage)).exists(),
    getValue: () => getValue(),
    getNumericValue: () => getDataAttribute(ProgressBarDataKeys.value, Number),
    isCompleted: async () =>
      (await getValue()) >= (await getDataAttribute(ProgressBarDataKeys.max)),
    hasError: () => stylableUnidriverUtil.hasStyleState(base, 'error'),
    getMinValue: () => getDataAttribute(ProgressBarDataKeys.min, Number),
    getMaxValue: () => getDataAttribute(ProgressBarDataKeys.max, Number),
    getAriaValueNow: () =>
      getDataAttribute(ProgressBarAriaKeys.valuenow, Number),
    getAriaValueMax: () =>
      getDataAttribute(ProgressBarAriaKeys.valuemax, Number),
    getAriaValueMin: () =>
      getDataAttribute(ProgressBarAriaKeys.valuemin, Number),
    getRoleAttribute: () => getDataAttribute('role'),
  };
};
