import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';

export interface SignatureInputDriver extends BaseUniDriver {
  getChildDriverByHook(dataHook: string): UniDriver;
}

export const signaturePadUniDriverFactory = (
  base: UniDriver,
): SignatureInputDriver => {
  return {
    ...baseUniDriverFactory(base),
    getChildDriverByHook: (dataHook: string) => {
      return base.$(`[data-hook="${dataHook}"]`);
    },
  };
};
