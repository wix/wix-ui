import { popoverNextDriverFactory as publicDriverFactory } from '../popover-next.uni.driver';
import { CommonDriver } from '../popover.common.uni.driver';

export const popoverNextPrivateDriverFactoryUni = (base, body) => {
  const commonDriver = CommonDriver(base, body);
  return {
    ...publicDriverFactory(base, body),
    isContentElementExistsWithoutChunkAwait: async () =>
      (await commonDriver.getContentElement()).exists(),
  };
};
