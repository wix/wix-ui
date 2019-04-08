import {
    BaseUniDriver,
    baseUniDriverFactory
  } from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'wix-ui-test-utils/unidriver';
import styles from './LinearProgressBar.st.css';
import { ReactBase } from '../../../test/utils/unidriver/ReactBase';
import { StylableUnidriverUtil } from '../../../test/StylableUnidriverUtil';

  export interface LinearProgressBarDriver extends BaseUniDriver {
      /** Get the width of the foreground bar (the progress) */
    getWidth: () => Promise<string>;
    /** Returns Promise<boolean that indicates if the success icon exists */
    isSuccessIconDisplayed: () => Promise<boolean>;
    /** Returns Promise<boolean that indicates if the error icon exists */
    isErrorIconDisplayed: () => Promise<boolean>;
    /** Returns Promise<boolean that indicates if the progress percentages text exists */
    isPercentagesProgressDisplayed: () => Promise<boolean>;
    /** Get the progress percentages value */
    getValue: () => Promise<string>;
    /** Get the progress numeric value */
    getNumericValue: () => Promise<number>;
    /** Returms true if has progress completed (value is 100) */
    isCompleted: () => Promise<boolean>;
    /** Returms true if has error */
    hasError: () => Promise<boolean>;
  }
  
  export const linearProgressBarUniDriverFactory = (base: UniDriver): LinearProgressBarDriver => {
    const byDataHook = (dataHook) => `[data-hook="${dataHook}"]`
    const stylableUnidriverUtil = new StylableUnidriverUtil(styles);
    
    const getValue = async () => {
        if (!await base.exists()) {
            return null
        }
        return base.$(byDataHook('progress-percentages')).$('span').text();
    };

    const getNumericValue = async () => {
        if (!await base.exists()) {
            return null
        }
        const value = await base.$(byDataHook('progressbar-foreground')).attr('data-progress-value');
        return +value;
    }
    return {
      ...baseUniDriverFactory(base),
      getWidth: async () => {
        const bar = base.$(byDataHook('progressbar-foreground'))
        const unidriverReactDOMExtension = ReactBase(bar);
        return (await unidriverReactDOMExtension.getStyle()).width;
      },
      isSuccessIconDisplayed: () => base.$(byDataHook('success-icon')).exists(),
      isErrorIconDisplayed: () => base.$(byDataHook('error-icon')).exists(),
      isPercentagesProgressDisplayed: () => base.$(byDataHook('progress-percentages')).exists(),
      getValue: () => getValue(),
      getNumericValue: async () => getNumericValue(),
      isCompleted: async () => (await getValue()) === '100',
      hasError: () => stylableUnidriverUtil.hasStyleState(base, 'error'),
    }
  };
  
  