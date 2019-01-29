import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'unidriver';

export interface CaptchaDriver extends BaseUniDriver {
  /** clicks on the captcha checkbox challenge */
  getTheme: () => Promise<string>;
  getSize: () => Promise<string>;
  getLang: () => Promise<string>;
  getCaptchaType: () => Promise<string>;
}

export const captchaDriverFactory = (base: UniDriver): CaptchaDriver => {
  return {
    ...baseUniDriverFactory(base),
    getTheme: async () => base.attr('data-theme'),
    getSize: async () => base.attr('data-size'),
    getLang: async () => base.attr('data-lang'),
    getCaptchaType: async () => base.attr('data-captcha-type')
  }
};
