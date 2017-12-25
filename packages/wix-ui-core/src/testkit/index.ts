import {testkitFactoryCreator} from 'wix-ui-test-utils';

import {toggleSwitchDriverFactory} from '../components/ToggleSwitch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = testkitFactoryCreator(toggleSwitchDriverFactory);

import {buttonDriverFactory} from '../components/Button/Button.driver';
export const buttonTestkitFactory = testkitFactoryCreator(buttonDriverFactory);

import {buttonLayoutDriverFactory} from '../components/ButtonLayout/ButtonLayout.driver';
export const buttonLayoutTestkitFactory = testkitFactoryCreator(buttonLayoutDriverFactory);

import {inputDriverFactory} from '../components/Input/Input.driver';
export const inputTestkitFactory = testkitFactoryCreator(inputDriverFactory);

import {textDriverFactory} from '../components/Text/Text.driver';
export const textTestkitFactory = testkitFactoryCreator(textDriverFactory);

import {badgeDriverFactory} from '../components/Badge/Badge.driver';
export const badgeTestkitFactory = testkitFactoryCreator(badgeDriverFactory);

import {tooltipDriverFactory} from '../components/Tooltip/Tooltip.driver';
export const tooltipTestkitFactory = testkitFactoryCreator(tooltipDriverFactory);
