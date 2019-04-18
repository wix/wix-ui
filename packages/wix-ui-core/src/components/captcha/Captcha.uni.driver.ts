import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';

export interface CaptchaDriver extends BaseUniDriver {
  getTheme(): Promise<string>;
  getSize(): Promise<string>;
  getLang(): Promise<string>;
  isRequired(): Promise<boolean>;
  getCaptchaType(): Promise<string>;
}

export const captchaDriverFactory = (base: UniDriver): CaptchaDriver => {
  return {
    ...baseUniDriverFactory(base),
    getTheme: async () => base.attr('data-theme'),
    getSize: async () => base.attr('data-size'),
    getLang: async () => base.attr('data-lang'),
    isRequired: async () => base.$('[data-hook="required-field"]').exists(),
    getCaptchaType: async () => base.attr('data-captcha-type'),
  };
};
