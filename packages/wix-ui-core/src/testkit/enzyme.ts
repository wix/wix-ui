import {enzymeTestkitFactoryCreator} from 'wix-ui-test-utils';

import {toggleSwitchDriverFactory} from '../components/ToggleSwitch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = enzymeTestkitFactoryCreator(toggleSwitchDriverFactory);

import {inputDriverFactory} from '../components/Input/Input.driver';
export const inputTestkitFactory = enzymeTestkitFactoryCreator(inputDriverFactory);

import {textDriverFactory} from '../components/Text/Text.driver';
export const textTestkitFactory = enzymeTestkitFactoryCreator(textDriverFactory);

import {popoverDriverFactory} from '../components/Popover/Popover.driver';
export const popoverTestkitFactory = enzymeTestkitFactoryCreator(popoverDriverFactory);
