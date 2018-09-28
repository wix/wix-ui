import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'unidriver';

export interface MenuDriver extends BaseUniDriver {
  clickItemAtIndex: (Number) => Promise<void>;
}

export const menuDriverFactory = (base: UniDriver): MenuDriver => {
  return {
    ...baseUniDriverFactory(base),
    clickItemAtIndex: async index =>
      await base.$(`[data-hook^="menu-item-${index}"]`).click()
  };
};
