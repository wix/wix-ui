import {enzymeTestkitFactoryCreator} from 'wix-ui-test-utils';

import {toggleSwitchDriverFactory} from '../components/ToggleSwitch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = enzymeTestkitFactoryCreator(toggleSwitchDriverFactory);

import {buttonDriverFactory} from '../components/Button/Button.driver';
export const buttonTestkitFactory = enzymeTestkitFactoryCreator(buttonDriverFactory);

import {inputDriverFactory} from '../components/Input/Input.driver';
export const inputTestkitFactory = enzymeTestkitFactoryCreator(inputDriverFactory);

import {textDriverFactory} from '../components/Text/Text.driver';
export const textTestkitFactory = enzymeTestkitFactoryCreator(textDriverFactory);

import {badgeDriverFactory} from '../components/Badge/Badge.driver';
export const badgeTestkitFactory = enzymeTestkitFactoryCreator(badgeDriverFactory);
