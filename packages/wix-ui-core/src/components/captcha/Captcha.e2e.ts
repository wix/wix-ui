import {browser, $, $$} from 'protractor';
import {createStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {captchaTestkitFactory} from '../../testkit/protractor';

describe('Captcha', () => {
  const storyUrl = createStoryUrl({kind: 'WIP', story: 'Captcha'});

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  afterEach(() => autoExampleDriver.remount());

  describe('wrapped test component', () => {
    const dataHook = 'captcha-test-example';
    const resetButtonDataHook = 'captcha-reset-button';
    const loadedDataHook = 'captcha-test-example-loaded';
    const themeDataHook = 'captcha-test-example-theme';
    const sizeDataHook = 'captcha-test-example-size';
    const verifiedDataHook = 'captcha-test-example-verified';
    const verifiedTokenDataHook = 'captcha-test-example-verified-token';
    const verifiedByStateDataHook = 'captcha-test-example-verified-by-state';
    const verifiedByNegStateDataHook = 'captcha-test-example-verified-by-neg-state';

    it('should load the component', async () => {
      await waitForVisibilityOf($(`[data-hook=${dataHook}`));
      await waitForVisibilityOf($(`[data-hook=${loadedDataHook}`));

      expect(await $(`[data-hook=${loadedDataHook}]`).getText()).toEqual('loaded=true');
    });

    it('should load the component with dark theme', async () => {
      await waitForVisibilityOf($(`[data-hook=${dataHook}`));
      await waitForVisibilityOf($(`[data-hook=${loadedDataHook}`));
      expect(await $(`[data-hook=${loadedDataHook}]`).getText()).toEqual('loaded=true');
      expect(await $(`[data-hook=${themeDataHook}]`).getText()).toEqual('theme=dark');
    });

    it('should load the component with compact size', async () => {
      await waitForVisibilityOf($(`[data-hook=${dataHook}`));
      await waitForVisibilityOf($(`[data-hook=${loadedDataHook}`));
      expect(await $(`[data-hook=${loadedDataHook}]`).getText()).toEqual('loaded=true');
      expect(await $(`[data-hook=${sizeDataHook}]`).getText()).toEqual('size=compact');
    });

    it('should verify the user click generates verification string', async () => {
      const driver = captchaTestkitFactory({dataHook});
      const captchaElement = $(`[data-hook=${dataHook}`);
      await waitAndClickOnCaptcha(captchaElement);
      // lets wait for the verified and verified string
      await waitForVisibilityOf($(`[data-hook=${verifiedByStateDataHook}`));
      await waitForVisibilityOf($(`[data-hook=${verifiedTokenDataHook}`));

      expect(await $(`[data-hook=${verifiedByStateDataHook}]`).getText()).toEqual('verified-by-state=true');
      expect(await $(`[data-hook=${verifiedTokenDataHook}]`).getText()).not.toEqual('verifiedToken=');
      expect(await $(`[data-hook=${verifiedTokenDataHook}]`).getText()).toContain('verifiedToken=');
    });

    /**
     * this method will find the captcha frame and click it
     * @param captchaElement
     */
    async function waitAndClickOnCaptcha(captchaElement) {
      await waitForVisibilityOf(captchaElement);
      // lets wait for the captcha to load from google
      await waitForVisibilityOf($(`[data-hook=${loadedDataHook}`));
      //lets find the iframe with the captcha checkbox
      const captchaIframe = captchaElement.$('iframe');
      await browser.switchTo().frame(captchaIframe.getWebElement());
      //click the captcha check box - we use a key that will always return non bot verified
      await $('.recaptcha-checkbox-checkmark').click();
      await browser.switchTo().defaultContent();
    }

    /**
     * as we manage the state in the example captcha we need a state change to re-render the test
     * we have two txt field that shows the verification state
     * one will be visible on "verified = true" and the other will be visible on "verified = false"
     * this way we can wait for them to to show and verify the value
     */
    it('should reset a verified captcha', async () => {
      const captchaElement = $(`[data-hook=${dataHook}`);
      await waitAndClickOnCaptcha(captchaElement);
      // lets wait for the verified and verified string
      await waitForVisibilityOf($(`[data-hook=${verifiedByStateDataHook}`));
      expect(await $(`[data-hook=${verifiedByStateDataHook}]`).getText()).toEqual('verified-by-state=true');
      $(`[data-hook=${resetButtonDataHook}`).click();
      await waitForVisibilityOf($(`[data-hook=${verifiedByNegStateDataHook}`));
      expect(await $(`[data-hook=${verifiedByNegStateDataHook}]`).getText()).toEqual('verified-by-state=false');
    });
  })
});
