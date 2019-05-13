import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver, StylableUnidriverUtil } from 'wix-ui-test-utils/unidriver';
import styles from './LinearProgressBar.st.css';
import {ReactBase} from '../../../test/utils/unidriver/ReactBase';
import {ProgressBarDataHooks} from './DataHooks';

export const byDataHook = dataHook => `[data-hook="${dataHook}"]`;
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
  getNumericValue: () => Promise<number>;
  /** Returns true if has progress completed (value is 100) */
  isCompleted: () => Promise<boolean>;
  /** Returns true if has error */
  hasError: () => Promise<boolean>;
  /** Returns aria-`ariaName` attribute */
  getAriaAttr: (ariaName: string) => Promise<string>;
}

export const linearProgressBarUniDriverFactory = (
  base: UniDriver,
): LinearProgressBarUniDriver => {
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

  const getNumericValue = async () => {
    if (!(await base.exists())) {
      return null;
    }
    const value = await base
      .$(byDataHook(ProgressBarDataHooks.foreground))
      .attr('data-progress-value');
    return +value;
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
      base.$(byDataHook('progress-percentages')).exists(),
    getValue: () => getValue(),
    getNumericValue: async () => getNumericValue(),
    isCompleted: async () => (await getValue()) === '100',
    hasError: () => stylableUnidriverUtil.hasStyleState(base, 'error'),
    getAriaAttr: (ariaName: string) =>
      base
        .$(byDataHook(ProgressBarDataHooks.container))
        .attr(`aria-${ariaName}`),
  };
};
