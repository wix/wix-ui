import { browser } from 'protractor';
import {
  createStoryUrl,
  protractorUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/protractor';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { captchaTestkitFactory } from '../../testkit/protractor';
import { CaptchaLang, CaptchaType, Size, Theme } from './types';

import {
  CaptchaTestComponentDriver,
  CaptchaTestInstanceDriverFactory,
} from './test-assets/CaptchaTestComponent.testDriver';
import { constants } from './test-assets/constants';
import { Category } from '../../../stories/utils';

const captchaTestInstanceFactory =
  protractorUniTestkitFactoryCreator<CaptchaTestComponentDriver>(
    CaptchaTestInstanceDriverFactory,
  );

describe('Captcha', () => {
  const storyUrl = createStoryUrl({
    kind: Category.COMPONENTS,
    story: 'Captcha',
  });

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  afterEach(() => autoExampleDriver.remount());

  describe('captcha component', () => {
    const dataHook = constants.dataHook;

    it('should load the component with dark theme', async () => {
      const driver = captchaTestkitFactory({ dataHook });
      expect(await driver.getTheme()).toBe(Theme.dark);
    });

    it('should load the component with type image ', async () => {
      const driver = captchaTestkitFactory({ dataHook });
      expect(await driver.getCaptchaType()).toBe(CaptchaType.image);
    });

    it('should load the component with size compact ', async () => {
      const driver = captchaTestkitFactory({ dataHook });
      expect(await driver.getSize()).toBe(Size.normal);
    });

    it('should load the component with lang en ', async () => {
      const driver = captchaTestkitFactory({ dataHook });
      expect(await driver.getLang()).toBe(CaptchaLang.EnglishUS);
    });

    describe('captcha test component', () => {
      it('should load the component', async () => {
        const driver = captchaTestInstanceFactory({ dataHook });
        expect(await driver.isCaptchaRendered()).toBe(true);
      });

      it('should verify the user click generates verification string', async () => {
        const driver = captchaTestInstanceFactory({ dataHook });
        await driver.clickOnCaptcha();
        expect(await driver.isCaptchaVerified()).toBe(true);
      });

      it('should reset a verified captcha', async () => {
        const driver = captchaTestInstanceFactory({ dataHook });
        await driver.clickOnCaptcha();
        expect(await driver.isCaptchaVerified()).toBe(true);
        await driver.resetCaptcha();
        expect(await driver.isCaptchaResetted()).toBe(true);
      });
    });
  });
});
