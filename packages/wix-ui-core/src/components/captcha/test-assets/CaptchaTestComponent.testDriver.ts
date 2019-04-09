import { browser, $, $$ } from 'protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { constants } from './constants';

import {
  UniDriver,
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/unidriver';

async function isCaptchaVerified() {
  await waitForVisibilityOf($(`[data-hook=${constants.verifiedTokenDataHook}`));
  const verifiedToken = await $(
    `[data-hook=${constants.verifiedTokenDataHook}]`,
  ).getText();
  return (
    verifiedToken !== constants.verifiedTokenMark &&
    verifiedToken.includes(constants.verifiedTokenMark)
  );
}

async function isCaptchaResetted() {
  await waitForVisibilityOf($(`[data-hook=${constants.resetDataHook}`));
  const resetTxt = await $(`[data-hook=${constants.resetDataHook}]`).getText();
  return resetTxt === constants.resetMark;
}

async function validateCaptchaRendered() {
  await waitForVisibilityOf($(`[data-hook=${constants.renderDataHook}`));
  return (
    (await $(`[data-hook=${constants.renderDataHook}]`).getText()) ===
    constants.renderedMark + 'true'
  );
}

/**
 * this method will find the captcha frame and click it
 */
async function waitAndClickOnCaptcha() {
  const captchaElement = $(`[data-hook=${constants.dataHook}`);
  await waitForVisibilityOf(captchaElement);
  // lets wait for the captcha to render
  await waitForVisibilityOf($(`[data-hook=${constants.renderDataHook}`));
  //lets find the iframe with the captcha checkbox
  const captchaIframe = captchaElement.$('iframe');
  await browser.switchTo().frame(captchaIframe.getWebElement());
  //click the captcha check box - we use a key that will always return non bot verified
  await $('.recaptcha-checkbox-checkmark').click();
  return browser.switchTo().defaultContent();
}

export interface CaptchaTestComponentDriver extends BaseUniDriver {
  resetCaptcha(): Promise<any>;
  clickOnCaptcha(): Promise<any>;
  isCaptchaRendered(): Promise<boolean>;
  isCaptchaVerified(): Promise<boolean>;
  isCaptchaResetted(): Promise<boolean>;
}

export const CaptchaTestInstanceDriverFactory = (
  base: UniDriver,
): CaptchaTestComponentDriver => {
  return {
    ...baseUniDriverFactory(base),
    resetCaptcha: async () =>
      $(`[data-hook=${constants.resetButtonDataHook}`).click(),
    clickOnCaptcha: async () => waitAndClickOnCaptcha(),
    isCaptchaRendered: async () => validateCaptchaRendered(),
    isCaptchaVerified: async () => isCaptchaVerified(),
    isCaptchaResetted: async () => isCaptchaResetted(),
  };
};
