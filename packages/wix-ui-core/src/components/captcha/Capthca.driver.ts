import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'unidriver';

export interface CaptchaDriver extends BaseUniDriver {
  /** clicks on the captcha checkbox challenge */
  clickOnCaptchaCheckbox: () => Promise<any>;
}

export const captchaDriverFactory = (base: UniDriver): CaptchaDriver => {
  return {
    ...baseUniDriverFactory(base),
    // clickOnCaptchaCheckbox: () => base.$('.recaptcha-checkbox-checkmark').click()
  };
};
