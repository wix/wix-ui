import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  buttonNextDriverFactory as publicButtonDriver,
  ButtonNextDriver,
} from './button-next.uni.driver';

export interface ButtonNextPrivateDriver extends ButtonNextDriver {
  suffixExists(): Promise<boolean>;
  hasSuffixClass(string): Promise<boolean>;
  prefixExists(): Promise<boolean>;
  hasPrefixClass(string): Promise<boolean>;
}

export const buttonNextPrivateDriverFactory = (
  base: UniDriver,
): ButtonNextPrivateDriver => {
  const getSuffix = () => base.$('[data-hook="suffix"]');
  const getPrefix = () => base.$('[data-hook="prefix"]');

  return {
    ...publicButtonDriver(base),
    suffixExists: async () => getSuffix().exists(),
    hasSuffixClass: async (className) => getSuffix().hasClass(className),
    prefixExists: async () => getPrefix().exists(),
    hasPrefixClass: async (className) => getPrefix().hasClass(className),
  };
};
