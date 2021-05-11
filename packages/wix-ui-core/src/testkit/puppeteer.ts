import { puppeteerUniTestkitFactoryCreator } from 'wix-ui-test-utils/puppeteer';

import {
  avatarDriverFactory,
  AvatarDriver,
} from '../components/avatar/avatar.uni.driver';
export const avatarTestkitFactory =
  puppeteerUniTestkitFactoryCreator(avatarDriverFactory);
export { AvatarDriver };

import {
  buttonNextDriverFactory,
  ButtonNextDriver,
} from '../components/button-next/button-next.uni.driver';
export const buttonNextTestkitFactory = puppeteerUniTestkitFactoryCreator(
  buttonNextDriverFactory,
);
export { ButtonNextDriver };

import {
  captchaDriverFactory,
  CaptchaDriver,
} from '../components/captcha/Captcha.uni.driver';
export const captchaTestkitFactory =
  puppeteerUniTestkitFactoryCreator<CaptchaDriver>(captchaDriverFactory);
export { CaptchaDriver };

import {
  filePickerButtonUniDriverFactory,
  FilePickerButtonUniDriver,
} from '../components/file-picker-button/test/FilePickerButton.uni.driver';
export const filePickerButtonTestkitFactory = puppeteerUniTestkitFactoryCreator(
  filePickerButtonUniDriverFactory,
);
export { FilePickerButtonUniDriver };

import {
  LinearProgressBarUniDriver,
  linearProgressBarUniDriverFactory,
} from '../components/linear-progress-bar/LinearProgressBar.uni.driver';
export const linearProgressBarTestkitFactory =
  puppeteerUniTestkitFactoryCreator<LinearProgressBarUniDriver>(
    linearProgressBarUniDriverFactory,
  );
export { LinearProgressBarUniDriver };

import {
  CircularProgressBarUniDriver,
  circularProgressBarUniDriverFactory,
} from '../components/circular-progress-bar/CircularProgressBar.uni.driver';
export const circularProgressBarTestkitFactory =
  puppeteerUniTestkitFactoryCreator<CircularProgressBarUniDriver>(
    circularProgressBarUniDriverFactory,
  );
export { CircularProgressBarUniDriver };

import {
  signatureInputUniDriverFactory,
  SignatureInputDriver,
} from '../components/signature-input/SignatureInput.uni.driver';
export const signatureInputTestkitFactory = puppeteerUniTestkitFactoryCreator(
  signatureInputUniDriverFactory,
);
export { SignatureInputDriver };

import {
  makeTagsListUniDriver,
  TagsListUniDriver,
} from '../components/tags-list/TagsList.uni.driver';
export const tagsListTestkitFactory = puppeteerUniTestkitFactoryCreator(
  makeTagsListUniDriver,
);
export { TagsListUniDriver };

import {
  horizontalMenuUniDriverFactory,
  HorizontalMenuDriver,
} from '../components/horizontal-menu/HorizontalMenu.uni.driver';
export const horizontalMenuTestkitFactory = puppeteerUniTestkitFactoryCreator(
  horizontalMenuUniDriverFactory,
);
export { HorizontalMenuDriver };
