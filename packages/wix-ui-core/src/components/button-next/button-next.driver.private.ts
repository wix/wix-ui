import { EnhancedUniDriver } from 'wix-ui-test-utils/unidriver';
import {
  buttonNextDriverFactory as publicButtonDriver,
  ButtonNextDriver
} from './button-next.driver';

export interface ButtonNextPrivateDriver extends ButtonNextDriver {
  suffixExists: () => Promise<boolean>;
  prefixExists: () => Promise<boolean>;
}

export const buttonNextPrivateDriverFactory = (
  base: EnhancedUniDriver
): ButtonNextPrivateDriver => {
  return {
    ...publicButtonDriver(base),
    suffixExists: async () => await base.queryHook('suffix').exists(),
    prefixExists: async () => await base.queryHook('prefix').exists()
  };
};
