import {browser, $, $$} from 'protractor';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {CaptchaConstants} from '../Captcha.constants'

import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import {UniDriver} from 'unidriver';

async function isCaptchaVerified() {
  await waitForVisibilityOf($(`[data-hook=${CaptchaConstants.verifiedTokenDataHook}`));
  const verifiedToken = await $(`[data-hook=${CaptchaConstants.verifiedTokenDataHook}]`).getText();
  return verifiedToken !== CaptchaConstants.verifiedTokenMark && verifiedToken.includes(CaptchaConstants.verifiedTokenMark);
}

async function isCaptchaResetted() {
  await waitForVisibilityOf($(`[data-hook=${CaptchaConstants.resetDataHook}`));
  const resetTxt = await $(`[data-hook=${CaptchaConstants.resetDataHook}]`).getText();
  return resetTxt === CaptchaConstants.resetMark;
}

async function validateCaptchaRendered() {
  await waitForVisibilityOf($(`[data-hook=${CaptchaConstants.renderDataHook}`));
  return await $(`[data-hook=${CaptchaConstants.renderDataHook}]`).getText() === CaptchaConstants.renderedMark + 'true';
}

/**
 * this method will find the captcha frame and click it
 */
async function waitAndClickOnCaptcha() {
  const captchaElement = $(`[data-hook=${CaptchaConstants.dataHook}`);
  await waitForVisibilityOf(captchaElement);
  // lets wait for the captcha to render
  await waitForVisibilityOf($(`[data-hook=${CaptchaConstants.renderDataHook}`));
  //lets find the iframe with the captcha checkbox
  const captchaIframe = captchaElement.$('iframe');
  await browser.switchTo().frame(captchaIframe.getWebElement());
  //click the captcha check box - we use a key that will always return non bot verified
  await $('.recaptcha-checkbox-checkmark').click();
  return browser.switchTo().defaultContent();
}

export interface CaptchaTestComponentDriver extends BaseUniDriver {
  resetCaptcha: () => Promise<any>;
  clickOnCaptcha: () => Promise<any>;
  isCaptchaRendered: () => Promise<boolean>;
  isCaptchaVerified: () => Promise<boolean>;
  isCaptchaResetted: () => Promise<boolean>;
}

export const CaptchaTestInstanceDriverFactory = (base: UniDriver): CaptchaTestComponentDriver => {
  return {
    ...baseUniDriverFactory(base),
    resetCaptcha: async () => $(`[data-hook=${CaptchaConstants.resetButtonDataHook}`).click(),
    clickOnCaptcha: async () => waitAndClickOnCaptcha(),
    isCaptchaRendered: async () => validateCaptchaRendered(),
    isCaptchaVerified: async () => isCaptchaVerified(),
    isCaptchaResetted: async () => isCaptchaResetted()
  }
};
