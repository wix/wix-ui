import {browser, $, $$} from 'protractor';
import {createStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';

const dataHook = 'captcha-test-example';
const loadedDataHook = 'captcha-test-example-rendered';
const verifiedByStateDataHook = 'captcha-test-example-verified-by-state';
const resetButtonDataHook = 'captcha-reset-button';
const verifiedTokenDataHook = 'captcha-test-example-verified-token';
const verifiedByNegStateDataHook = 'captcha-test-example-verified-by-neg-state';
const verifiedDataHook = 'captcha-verified'

import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'unidriver';

/**
 * this method will find the captcha frame and click it
 * @param captchaElement
 */
async function waitAndClickOnCaptchaImpl(captchaElement) {
  await waitForVisibilityOf(captchaElement);
  // lets wait for the captcha to load from google
  await waitForVisibilityOf($(`[data-hook=${loadedDataHook}`));
  //lets find the iframe with the captcha checkbox
  const captchaIframe = captchaElement.$('iframe');
  await browser.switchTo().frame(captchaIframe.getWebElement());
  //click the captcha check box - we use a key that will always return non bot verified
  await $('.recaptcha-checkbox-checkmark').click();
  return browser.switchTo().defaultContent();
}

async function waitForCaptchaVerificationString() {
  await waitForVisibilityOf($(`[data-hook=${verifiedByStateDataHook}`));
  return $(`[data-hook=${verifiedByStateDataHook}]`).getText();
}

async function validateCaptchaIsActuallyVerifiedByUser() {
  await waitForVisibilityOf($(`[data-hook=${verifiedByStateDataHook}`));
  await waitForVisibilityOf($(`[data-hook=${verifiedTokenDataHook}`));
  const verifyHookDataString :String = await $(`[data-hook=${verifiedByStateDataHook}]`).getText();
  const verifiedToken = await $(`[data-hook=${verifiedTokenDataHook}]`).getText();
  return verifyHookDataString === 'verified-by-state=true' && verifiedToken !== 'verifiedToken=' && verifiedToken.includes('verifiedToken=');
}

async function validateCaptchaHasBeenReseted() {
  return await $(`[data-hook=${verifiedDataHook}]`).getText() === 'false';
}

async function validateCaptcharenderedString() {
  await waitForVisibilityOf($(`[data-hook=${loadedDataHook}`));
  return await $(`[data-hook=${loadedDataHook}]`).getText() === 'rendered=true';
}

/**
 * this method will find the captcha frame and click it
 * @param captchaElement
 */
async function waitAndClickOnCaptcha() {
  const captchaElement = $(`[data-hook=${dataHook}`);
  await waitForVisibilityOf(captchaElement);
  // lets wait for the captcha to load from google
  await waitForVisibilityOf($(`[data-hook=${loadedDataHook}`));
  //lets find the iframe with the captcha checkbox
  const captchaIframe = captchaElement.$('iframe');
  await browser.switchTo().frame(captchaIframe.getWebElement());
  //click the captcha check box - we use a key that will always return non bot verified
  await $('.recaptcha-checkbox-checkmark').click();
  return browser.switchTo().defaultContent();
}

export interface CaptchaTestInstanceDriver extends BaseUniDriver {
  waitForCaptchaLoaded: () => Promise<any>;
  resetCaptcha: () => Promise<any>;
  clickOnCaptcha: () => Promise<any>;
  waitForCaptchaRendered: () => Promise<any>;
  waitForCaptchaVerificationString: () => Promise<string>;
  validateCaptchaRendered: () => Promise<boolean>;
  validateCaptchaRest: () => Promise<boolean>;
  validateCaptchaIsVerified: () => Promise<boolean>;
}

export const CaptchaTestInstanceDriverFactory = (base: UniDriver): CaptchaTestInstanceDriver => {
  return {
    ...baseUniDriverFactory(base),
    waitForCaptchaLoaded: async () => waitForVisibilityOf($(`[data-hook=${dataHook}`)),
    resetCaptcha: async () => $(`[data-hook=${resetButtonDataHook}`).click(),
    waitForCaptchaRendered: async () => waitForVisibilityOf($(`[data-hook=${loadedDataHook}`)),
    waitForCaptchaVerificationString: async () => waitForCaptchaVerificationString(),
    validateCaptchaRendered: async () => validateCaptcharenderedString(),
    validateCaptchaIsVerified: async () => validateCaptchaIsActuallyVerifiedByUser(),
    validateCaptchaRest:async  () => validateCaptchaHasBeenReseted(),
    clickOnCaptcha : async () => waitAndClickOnCaptcha()
  }
};
