import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { DataHooks } from './dataHooks';

export interface SignatureInputDriver extends BaseUniDriver {
  getChildDriverByHook(dataHook: string): UniDriver;
  getA11yInput(): UniDriver;
}

export const signatureInputUniDriverFactory = (
  base: UniDriver,
): SignatureInputDriver => {
  return {
    ...baseUniDriverFactory(base),
    getA11yInput: () => base.$(`[data-hook="${DataHooks.a11yInput}"]`),
    getChildDriverByHook: (dataHook: string) => {
      return base.$(`[data-hook="${dataHook}"]`);
    },
  };
};
