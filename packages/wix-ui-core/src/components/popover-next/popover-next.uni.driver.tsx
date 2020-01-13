import { testkit } from '../popover/Popover.uni.driver';

export const popoverNextDriverFactory = (base, body) => {
  return {
    ...testkit(base, body),
  };
};
