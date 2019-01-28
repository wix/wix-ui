import {browser, $, $$} from 'protractor';
import {createStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {
  captchaTestkitFactory
} from '../../testkit/protractor';
import {Size, CaptchaType, Theme, CaptchaLang} from './types'

import {
  protractorUniTestkitFactoryCreator
} from 'wix-ui-test-utils/protractor';

import {
  CaptchaTestInstanceDriverFactory,
  CaptchaTestComponentDriver
} from './test-assets/captcha-test-component-driver';
const captchaTestInstanceFactory = protractorUniTestkitFactoryCreator<CaptchaTestComponentDriver>(CaptchaTestInstanceDriverFactory);

describe('Captcha', () => {
  const storyUrl = createStoryUrl({kind: 'WIP', story: 'Captcha'});

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  afterEach(() => autoExampleDriver.remount());

  describe('wrapped test component', () => {
    const dataHook = 'captcha-test-example';

    it('should load the component with dark theme', async () => {
      const driver = captchaTestkitFactory({dataHook});
      expect(await driver.getTheme()).toBe(Theme.dark);
    });

    it('should load the component with type image ', async () => {
      const driver = captchaTestkitFactory({dataHook});
      expect(await driver.getCaptchaType()).toBe(CaptchaType.image);
    });

    it('should load the component with size compact ', async () => {
      const driver = captchaTestkitFactory({dataHook});
      expect(await driver.getSize()).toBe(Size.compact);
    });

    it('should load the component with lang en ', async () => {
      const driver = captchaTestkitFactory({dataHook});
      expect(await driver.getLang()).toBe(CaptchaLang.EnglishUS);
    });

    describe('test component', () => {
      it('should load the component', async () => {
        const driver = captchaTestInstanceFactory({dataHook});
        expect(await driver.validateCaptchaRendered()).toBe(true);
      });

      it('should verify the user click generates verification string', async () => {
        const driver = captchaTestInstanceFactory({dataHook});
        await driver.clickOnCaptcha();
        expect(await driver.isCaptchaVerified()).toBe(true);
      });

      it('should reset a verified captcha', async () => {
        const driver = captchaTestInstanceFactory({dataHook});
        await driver.clickOnCaptcha();
        expect(await driver.isCaptchaVerified()).toBe(true);
        await driver.resetCaptcha();
        expect(await driver.isCaptchaResetted()).toBe(true);
      });
    })
  })
});
