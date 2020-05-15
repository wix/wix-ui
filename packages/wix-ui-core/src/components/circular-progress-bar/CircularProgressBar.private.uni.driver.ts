import { UniDriver } from 'wix-ui-test-utils/unidriver';

import { circularProgressBarUniDriverFactory as publicDriverFactory } from './CircularProgressBar.uni.driver';

export const circularProgressBarUniDriverFactory = (base: UniDriver) => ({
  ...publicDriverFactory(base),
  getAttribute: base.attr,
});
