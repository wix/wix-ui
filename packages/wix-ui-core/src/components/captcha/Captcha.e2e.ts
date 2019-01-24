import {browser, $, $$} from 'protractor';
import {createStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {
  captchaTestInstanceFactory,
  captchaTestkitFactory
} from '../../testkit/protractor';
import {Size, CaptchaType, Theme, CaptchaLang} from './types'

describe('Captcha', () => {
  const storyUrl = createStoryUrl({kind: 'WIP', story: 'Captcha'});

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  afterEach(() => autoExampleDriver.remount());

  describe('wrapped test component', () => {
    const dataHook = 'captcha-test-example';
    const resetButtonDataHook = 'captcha-reset-button';


    it('should load the component', async () => {
      const driver = captchaTestInstanceFactory({dataHook});
      await driver.waitForCaptchaLoaded();
      expect(driver.validateCaptchaRendered());
    });

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

    it('should verify the user click generates verification string', async () => {
      const driver = captchaTestInstanceFactory({dataHook});
      await driver.clickOnCaptcha();
      expect(driver.validateCaptchaIsVerified());
    });

    /**
     * as we manage the state in the example captcha we need a state change to re-render the test
     * we have two txt field that shows the verification state
     * one will be visible on "verified = true" and the other will be visible on "verified = false"
     * this way we can wait for them to to show and verify the value
     */

    it('should reset a verified captcha', async () => {
      const driver = captchaTestInstanceFactory({dataHook});
      await driver.clickOnCaptcha();
      // lets wait for the verified and verified string
      expect(await driver.validateCaptchaIsVerified());
      await driver.resetCaptcha();
      expect(await driver.validateCaptchaRest());
    });
  })
});
