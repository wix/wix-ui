import {testkitFactoryCreator} from 'wix-ui-test-utils/vanilla';

//JSS
import {toggleSwitchDriverFactory} from '../components/ToggleSwitch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = testkitFactoryCreator(toggleSwitchDriverFactory);

import {buttonDriverFactory} from '../components/Button/Button.driver';
export const buttonTestkitFactory = testkitFactoryCreator(buttonDriverFactory);

import {inputDriverFactory} from '../components/Input/Input.driver';
export const inputTestkitFactory = testkitFactoryCreator(inputDriverFactory);

import {paginationDriverFactory} from '../components/Pagination/Pagination.driver';
export const paginationTestkitFactory = testkitFactoryCreator(paginationDriverFactory);

import {tooltipDriverFactory} from '../components/Tooltip/Tooltip.driver';
export const tooltipTestkitFactory = testkitFactoryCreator(tooltipDriverFactory);

import {dividerDriverFactory} from '../components/Divider/Divider.driver';
export const dividerTestkitFactory = testkitFactoryCreator(dividerDriverFactory);

import {checkboxDriverFactory} from '../components/Checkbox/Checkbox.driver';
export const checkboxTestkitFactory = testkitFactoryCreator(checkboxDriverFactory);

//Stylable
import {toggleSwitchDriverFactory as stylableToggleSwitchDriverFactory} from '../components/StylableToggleSwitch/ToggleSwitch.driver';
export const stylableToggleSwitchTestkitFactory = testkitFactoryCreator(stylableToggleSwitchDriverFactory);

import {textDriverFactory} from '../components/Text/Text.driver';
export const textTestkitFactory = testkitFactoryCreator(textDriverFactory);

import {stylableButtonDriverFactory} from '../components/StylableButton/Button.driver';
export const stylableButtonTestkitFactory = testkitFactoryCreator(stylableButtonDriverFactory);

import {badgeDriverFactory} from '../components/Badge/Badge.driver';
export const badgeTestkitFactory = testkitFactoryCreator(badgeDriverFactory);

import {radioButtonDriverFactory} from '../components/RadioButton/RadioButton.driver';
export const radioButtonTestkitFactory = testkitFactoryCreator(radioButtonDriverFactory);

import {autocompleteDriverFactory} from '../components/Autocomplete/Autocomplete.driver';
export const autocompleteTestkitFactory = testkitFactoryCreator(autocompleteDriverFactory);
