import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'unidriver';

export interface MenuDriver extends BaseUniDriver {}

export const menuDriverFactory = (base: UniDriver): MenuDriver => {
  return {
    ...baseUniDriverFactory(base)
  };
};
