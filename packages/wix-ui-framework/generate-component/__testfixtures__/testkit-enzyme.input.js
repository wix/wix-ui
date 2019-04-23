import {
  enzymeTestkitFactoryCreator,
  enzymeUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/enzyme';

import inputDriverFactory from '../src/Input/Input.driver';

export const inputTestkitFactory = enzymeTestkitFactoryCreator(
  inputDriverFactory,
);

// wix-ui-core (unidriver)

import { avatarDriverFactory } from '../src/Avatar/Avatar.driver';

export const avatarTestkitFactory = enzymeUniTestkitFactoryCreator(
  avatarDriverFactory,
);
