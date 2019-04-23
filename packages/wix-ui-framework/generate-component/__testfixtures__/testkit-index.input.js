import {
  testkitFactoryCreator,
  uniTestkitFactoryCreator,
} from 'wix-ui-test-utils/vanilla';

import inputDriverFactory from '../src/Input/Input.driver';

export const inputTestkitFactory = testkitFactoryCreator(inputDriverFactory);

// wix-ui-core (unidriver)

import { avatarDriverFactory } from '../src/Avatar/Avatar.driver';

export const avatarTestkitFactory = uniTestkitFactoryCreator(
  avatarDriverFactory,
);
