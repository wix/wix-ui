import { popoverNextDriverFactory as publicDriverFactory } from '../popover-next.uni.driver';

export const popoverNextPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
