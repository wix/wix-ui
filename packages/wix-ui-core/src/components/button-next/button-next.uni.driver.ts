import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { dataHooks } from './constants';

const byDataHook =dataHook => `[data-hook="${dataHook}"]`;

export interface ButtonNextDriver extends BaseUniDriver {
  /** returns button text */
  getButtonTextContent(): Promise<string>;
  /** returns true if button disabled */
  isButtonDisabled(): Promise<boolean>;
  /** returns true if button focused */
  isFocused(): Promise<boolean>;
  /** returns true if a prefix icon exists */
  isPrefixIconExists(): Promise<boolean>;
  /** returns true if a suffix icon exists */
  isSuffixIconExists(): Promise<boolean>;
}

export const buttonNextDriverFactory = (base: UniDriver): ButtonNextDriver => ({
  ...baseUniDriverFactory(base),
  getButtonTextContent: async () => base.text(),
  isFocused: async () => document.activeElement === (await base.getNative()),
  isButtonDisabled: async () => {
    //Using aria-disabled to know if button is disabled.
    return (await base.attr('aria-disabled')) === 'true';
  },

  isPrefixIconExists: async () =>
    base.$(byDataHook(dataHooks.prefixIcon)).exists(),
  isSuffixIconExists: async () =>
    base.$(byDataHook(dataHooks.suffixIcon)).exists(),
});
