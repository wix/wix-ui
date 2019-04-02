import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'unidriver';

export interface CaptchaDriver extends BaseUniDriver {
  getTheme: () => Promise<string>;
  getSize: () => Promise<string>;
  getLang: () => Promise<string>;
  getRequired: () => Promise<string>;
  getCaptchaType: () => Promise<string>;
}

export const captchaDriverFactory = (base: UniDriver): CaptchaDriver => {
  return {
    ...baseUniDriverFactory(base),
    getTheme: async () => base.attr('data-theme'),
    getSize: async () => base.attr('data-size'),
    getLang: async () => base.attr('data-lang'),
    getRequired: async () => base.attr('data-required'),
    getCaptchaType: async () => base.attr('data-captcha-type')
  }
};
