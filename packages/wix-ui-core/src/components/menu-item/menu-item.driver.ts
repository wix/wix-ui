import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'unidriver';

export interface MenuItemDriver extends BaseUniDriver {}

export const menuItemDriverFactory = (base: UniDriver): MenuItemDriver => {
  return {
    ...baseUniDriverFactory(base)
  };
};
