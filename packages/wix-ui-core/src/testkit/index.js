import {testkitFactoryCreator} from 'wix-ui-test-utils/dist/src';

import toggleSwitchDriverFactory from '../components/ToggleSwitch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = testkitFactoryCreator(toggleSwitchDriverFactory);

import paginationDriverFactory from '../components/Pagination/Pagination.driver';
export const paginationTestkitFactory = testkitFactoryCreator(paginationDriverFactory);
