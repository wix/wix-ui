import { testkit as publicDriverFactory } from '../popover-next.uni.driver';

export const popoverNextPrivateDriverFactoryUni = (base, body) => {
  return {
    ...publicDriverFactory(base, body),

    // Add here driver methods that considered "private"
  };
};
