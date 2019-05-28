import {
  protractorTestkitFactoryCreator,
  protractorUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/protractor';

import inputDriverFactory from '../src/Input/Input.protractor.driver';

export const inputTestkitFactory = protractorTestkitFactoryCreator(
  inputDriverFactory,
);

// wix-ui-core (unidriver)

import { avatarDriverFactory } from '../src/Avatar/Avatar.driver';

export const avatarTestkitFactory = protractorUniTestkitFactoryCreator(
  avatarDriverFactory,
);
