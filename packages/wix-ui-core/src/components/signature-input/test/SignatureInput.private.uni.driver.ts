import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  SignatureInputDriver,
  signatureInputUniDriverFactory,
} from '../SignatureInput.uni.driver';
import { Simulate } from 'react-dom/test-utils';

export interface PrivateSignatureInputDriver extends SignatureInputDriver {
  focusA11yInput(): Promise<void>;
  blurA11yInput(): Promise<void>;
}

export const signatureInputPrivateUniDriverFactory = (
  base: UniDriver,
): PrivateSignatureInputDriver => {
  const publicDriver = signatureInputUniDriverFactory(base);

  return {
    ...publicDriver,
    focusA11yInput: async () => {
      const a11yInputEl = await publicDriver.getA11yInput().getNative();
      Simulate.focus(a11yInputEl);
    },
    blurA11yInput: async () => {
      const a11yInputEl = await publicDriver.getA11yInput().getNative();
      Simulate.blur(a11yInputEl);
    },
  };
};
