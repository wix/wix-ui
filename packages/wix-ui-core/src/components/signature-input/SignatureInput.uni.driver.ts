import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'wix-ui-test-utils/unidriver';

export interface SignatureInput extends BaseUniDriver {}

export const SignatureInputFactory = (base: UniDriver): SignatureInput => {
  return {
    ...baseUniDriverFactory(base),
  };
};
