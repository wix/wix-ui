import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  buttonNextDriverFactory as publicButtonDriver,
  ButtonNextDriver,
} from './button-next.driver';

export interface ButtonNextPrivateDriver extends ButtonNextDriver {
  suffixExists(): Promise<boolean>;
  prefixExists(): Promise<boolean>;
}

export const buttonNextPrivateDriverFactory = (
  base: UniDriver,
): ButtonNextPrivateDriver => {
  return {
    ...publicButtonDriver(base),
    suffixExists: async () => base.$('[data-hook="suffix"]').exists(),
    prefixExists: async () => base.$('[data-hook="prefix"]').exists(),
  };
};
