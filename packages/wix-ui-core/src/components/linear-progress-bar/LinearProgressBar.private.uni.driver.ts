import {UniDriver} from 'wix-ui-test-utils/unidriver';
import {ProgressBarDataHooks} from './DataHooks';
import {
  LinearProgressBarUniDriver,
  linearProgressBarUniDriverFactory,
  byDataHook,
} from './LinearProgressBar.uni.driver';

export interface LinearProgressBarPrivateUniDriver
  extends LinearProgressBarUniDriver {
  /** Returns progress bar container role attribute */
  getRoleAttribute: () => Promise<string>;
}

export const linearProgressBarPrivateUniDriverFactory = (
  base: UniDriver
): LinearProgressBarPrivateUniDriver => {
  return {
    ...linearProgressBarUniDriverFactory(base),
    getRoleAttribute: () =>
      base.$(byDataHook(ProgressBarDataHooks.container)).attr('role'),
  };
};
