import {
  puppeteerTestkitFactoryCreator,
  puppeteerUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/puppeteer';

import inputDriverFactory from '../src/Input/Input.puppeteer.driver';

export const inputTestkitFactory = puppeteerTestkitFactoryCreator(
  inputDriverFactory,
);

// wix-ui-core (unidriver)

import { avatarDriverFactory } from '../src/Avatar/Avatar.driver';

export const avatarTestkitFactory = puppeteerUniTestkitFactoryCreator(
  avatarDriverFactory,
);
