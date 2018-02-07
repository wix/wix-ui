import {enzymeTestkitFactoryCreator, WrapperData} from 'wix-ui-test-utils/enzyme';

import {toggleSwitchDriverFactory} from '../components/ToggleSwitch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = enzymeTestkitFactoryCreator(toggleSwitchDriverFactory);

import {toggleSwitchDriverFactory as stylableToggleSwitchDriverFactory} from '../components/StylableToggleSwitch/ToggleSwitch.driver';
export const stylableToggleSwitchTestkitFactory = enzymeTestkitFactoryCreator(stylableToggleSwitchDriverFactory);

import {buttonDriverFactory} from '../components/Button/Button.driver';
export const buttonTestkitFactory = enzymeTestkitFactoryCreator(buttonDriverFactory);

import {inputDriverFactory} from '../components/Input/Input.driver';
//Ugly workaround for now
export const inputTestkitFactory: (obj: WrapperData) => any = enzymeTestkitFactoryCreator(inputDriverFactory);

import {textDriverFactory} from '../components/Text/Text.driver';
export const textTestkitFactory = enzymeTestkitFactoryCreator(textDriverFactory);

import {textDriverFactory as stylableTextDriverFactory} from '../components/StylableText/Text.driver';
export const stylableTextTestkitFactory = enzymeTestkitFactoryCreator(stylableTextDriverFactory);

import {badgeDriverFactory} from '../components/Badge/Badge.driver';
export const badgeTestkitFactory = enzymeTestkitFactoryCreator(badgeDriverFactory);

import {tooltipDriverFactory} from '../components/Tooltip/Tooltip.driver';
export const tooltipTestkitFactory = enzymeTestkitFactoryCreator(tooltipDriverFactory);

import {paginationDriverFactory} from '../components/Pagination/Pagination.driver';
export const paginationTestkitFactory = enzymeTestkitFactoryCreator(paginationDriverFactory);

import {dividerDriverFactory} from '../components/Divider/Divider.driver';
export const dividerTestkitFactory = enzymeTestkitFactoryCreator(dividerDriverFactory);

import {checkboxDriverFactory} from '../components/Checkbox/Checkbox.driver';
export const checkboxTestkitFactory = enzymeTestkitFactoryCreator(checkboxDriverFactory);
