import {enzymeTestkitFactoryCreator} from 'wix-ui-test-utils';

import {toggleSwitchDriverFactory} from '../components/ToggleSwitch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = enzymeTestkitFactoryCreator(toggleSwitchDriverFactory);

import {inputDriverFactory} from '../components/Input/Input.driver';
export const inputTestkitFactory = enzymeTestkitFactoryCreator(inputDriverFactory);

import {paginationDriverFactory} from '../components/Pagination/Pagination.driver';
export const paginationTestkitFactory = enzymeTestkitFactoryCreator(paginationDriverFactory);
