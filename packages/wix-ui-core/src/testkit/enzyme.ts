import {enzymeTestkitFactoryCreator, WrapperData} from 'wix-ui-test-utils/enzyme';

import {inputDriverFactory} from '../components/Input/Input.driver';
//Ugly workaround for now
export const inputTestkitFactory: (obj: WrapperData) => any = enzymeTestkitFactoryCreator(inputDriverFactory);

import {textDriverFactory} from '../components/Text/Text.driver';
export const textTestkitFactory = enzymeTestkitFactoryCreator(textDriverFactory);

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

// Stylable
import {toggleSwitchDriverFactory} from '../components/ToggleSwitch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = enzymeTestkitFactoryCreator(toggleSwitchDriverFactory);

import {textDriverFactory as stylableTextDriverFactory} from '../components/StylableText/Text.driver';
export const stylableTextTestkitFactory = enzymeTestkitFactoryCreator(stylableTextDriverFactory);

import {buttonDriverFactory} from '../components/Button/Button.driver';
export const buttonTestkitFactory = enzymeTestkitFactoryCreator(buttonDriverFactory);

import {badgeDriverFactory as stylableBadgeDriverFactory} from '../components/StylableBadge/Badge.driver';
export const stylableBadgeTestkitFactory = enzymeTestkitFactoryCreator(stylableBadgeDriverFactory);

import {radioButtonDriverFactory} from '../components/RadioButton/RadioButton.driver';
export const radioButtonTestkitFactory = enzymeTestkitFactoryCreator(radioButtonDriverFactory);

import {autocompleteDriverFactory} from '../components/Autocomplete/Autocomplete.driver';
export const autocompleteTestkitFactory = enzymeTestkitFactoryCreator(autocompleteDriverFactory);

import {sliderDriverFactory} from '../components/Slider/Slider.driver';
export const sliderTestkitFactory = enzymeTestkitFactoryCreator(sliderDriverFactory);

import {addressInputDriverFactory} from '../components/AddressInput/AddressInput.driver';
export const addressInputTestkitFactory = enzymeTestkitFactoryCreator(addressInputDriverFactory);

import {labelDriverFactory} from '../components/Label/Label.driver';
export const labelTestkitFactory = enzymeTestkitFactoryCreator(labelDriverFactory);

import {timePickerDriverFactory} from '../components/TimePicker/TimePicker.driver';
export const timePickerTestkitFactory = enzymeTestkitFactoryCreator(timePickerDriverFactory);
