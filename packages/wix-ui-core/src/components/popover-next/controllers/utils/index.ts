import { getPopoverTestUtils } from '../../../popover/utils/getPopoverTestUtils';

// This is here and not in the test setup because we don't want consumers to need to run it as well

export const generateTestID = () => {
  let testId;

  const isTestEnv = process.env.NODE_ENV === 'test';

  if (isTestEnv && typeof document !== 'undefined' && !document.createRange) {
    getPopoverTestUtils.createRange();
  }

  if (isTestEnv) {
    testId = getPopoverTestUtils.generateId();
  }

  return testId;
};
