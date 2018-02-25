import {protractorTestkitFactoryCreator, ElementFinder} from 'wix-ui-test-utils/protractor';

//JSS
import {inputDriverFactory} from '../components/Input/Input.protractor.driver';
export const inputTestkitFactory = protractorTestkitFactoryCreator(inputDriverFactory);

import {buttonDriverFactory} from '../components/Button/Button.protractor.driver';
export const buttonTestkitFactory = protractorTestkitFactoryCreator(buttonDriverFactory);

import {paginationDriverFactory} from '../components/Pagination/Pagination.protractor.driver';
export const paginationTestkitFactory = protractorTestkitFactoryCreator(paginationDriverFactory);

import {badgeDriverFactory} from '../components/Badge/Badge.protractor.driver';
export const badgeTestkitFactory = protractorTestkitFactoryCreator(badgeDriverFactory);

import {toggleSwitchDriverFactory} from '../components/ToggleSwitch/ToggleSwitch.protractor.driver';
export const toggleSwitchTestkitFactory = protractorTestkitFactoryCreator(toggleSwitchDriverFactory);

import {tooltipDriverFactory} from '../components/Tooltip/Tooltip.protractor.driver';
export const tooltipTestkitFactory = protractorTestkitFactoryCreator(tooltipDriverFactory);

import {dividerDriverFactory} from '../components/Divider/Divider.protractor.driver';
export const dividerTestkitFactory = protractorTestkitFactoryCreator(dividerDriverFactory);

import {googleMapsIframeClientDriverFactory} from '../clients/GoogleMaps/GoogleMapsIframeClient.protractor.driver';
export const googleMapsIframeClientTestkitFactory = protractorTestkitFactoryCreator(googleMapsIframeClientDriverFactory);

import {inputWithOptionsDriverFactory} from '../components/InputWithOptions/InputWithOptions.protractor.driver';
export const inputWithOptionsTestkitFactory = protractorTestkitFactoryCreator(inputWithOptionsDriverFactory);

import {dropdownContentDriverFactory} from '../baseComponents/DropdownContent/DropdownContent.protractor.driver';
export const dropdownContentTestkitFactory = protractorTestkitFactoryCreator(dropdownContentDriverFactory);

import {dropdownDriverFactory} from '../baseComponents/Dropdown/Dropdown.protractor.driver';
export const dropdownTestkitFactory = protractorTestkitFactoryCreator(dropdownDriverFactory);

import {checkboxDriverFactory} from '../components/Checkbox/Checkbox.protractor.driver';
export const checkboxTestkitFactory = protractorTestkitFactoryCreator(checkboxDriverFactory);

//Stylable
import {textDriverFactory} from '../components/StylableText/Text.protractor.driver';
export const textTestkitFactory = protractorTestkitFactoryCreator(textDriverFactory);

import {badgeDriverFactory as stylableBadgeDriverFactory} from '../components/StylableBadge/Badge.protractor.driver';
export const stylablebadgeTestkitFactory = protractorTestkitFactoryCreator(stylableBadgeDriverFactory);
