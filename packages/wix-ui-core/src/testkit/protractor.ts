import {protractorTestkitFactoryCreator} from 'wix-ui-test-utils/protractor';

//JSS
import {popoverDriverFactory, PopoverDriver} from '../baseComponents/Popover/Popover.protractor.driver';
export const popoverTestkitFactory = protractorTestkitFactoryCreator(popoverDriverFactory);

import {inputDriverFactory, InputDriver} from '../components/Input/Input.protractor.driver';
export const inputTestkitFactory = protractorTestkitFactoryCreator(inputDriverFactory);

import {paginationDriverFactory, PaginationDriver} from '../components/Pagination/Pagination.protractor.driver';
export const paginationTestkitFactory = protractorTestkitFactoryCreator(paginationDriverFactory);

import {badgeDriverFactory, BadgeDriver} from '../components/Badge/Badge.protractor.driver';
export const badgeTestkitFactory = protractorTestkitFactoryCreator(badgeDriverFactory);

import {tooltipDriverFactory, TooltipDriver} from '../components/Tooltip/Tooltip.protractor.driver';
export const tooltipTestkitFactory = protractorTestkitFactoryCreator(tooltipDriverFactory);

import {dividerDriverFactory, DividerDriver} from '../components/Divider/Divider.protractor.driver';
export const dividerTestkitFactory = protractorTestkitFactoryCreator(dividerDriverFactory);

import {googleMapsIframeClientDriverFactory, GoogleMapsIframeClientDriver} from '../clients/GoogleMaps/GoogleMapsIframeClient.protractor.driver';
export const googleMapsIframeClientTestkitFactory = protractorTestkitFactoryCreator(googleMapsIframeClientDriverFactory);

import {checkboxDriverFactory, CheckboxDriver} from '../components/Checkbox/Checkbox.protractor.driver';
export const checkboxTestkitFactory = protractorTestkitFactoryCreator(checkboxDriverFactory);

//Stylable
import {textDriverFactory, TextDriver} from '../components/StylableText/Text.protractor.driver';
export const textTestkitFactory = protractorTestkitFactoryCreator(textDriverFactory);

import {radioButtonDriverFactory, RadioButtonDriver} from '../components/RadioButton/RadioButton.protractor.driver';
export const radioButtonTestkitFactory = protractorTestkitFactoryCreator(radioButtonDriverFactory);

import {badgeDriverFactory as stylableBadgeDriverFactory, BadgeDriver as StylableBadgeDriver} from '../components/StylableBadge/Badge.protractor.driver';
export const stylablebadgeTestkitFactory = protractorTestkitFactoryCreator(stylableBadgeDriverFactory);

import {autocompleteDriverFactory, AutocompleteDriver} from '../components/Autocomplete/Autocomplete.protractor.driver';
export const autocompleteTestkitFactory = protractorTestkitFactoryCreator(autocompleteDriverFactory);

import {hBoxDriverFactory, HBoxDriver} from '../components/HBox/HBox.protractor.driver';
export const hBoxTestkitFactory = protractorTestkitFactoryCreator(hBoxDriverFactory);

import {sliderDriverFactory, SliderDriver} from '../components/Slider/Slider.protractor.driver';
export const sliderTestkitFactory = protractorTestkitFactoryCreator(sliderDriverFactory);

import {addressInputDriverFactory, AddressInputDriver} from '../components/AddressInput/AddressInput.protractor.driver';
export const addressInputTestkitFactory = protractorTestkitFactoryCreator(addressInputDriverFactory);

import {labelDriverFactory, LabelDriver} from '../components/Label/Label.protractor.driver';
export const labelTestkitFactory = protractorTestkitFactoryCreator(labelDriverFactory);

import {timePickerDriverFactory, TimePickerDriver} from '../components/TimePicker/TimePicker.protractor.driver';
export const timePickerTestkitFactory = protractorTestkitFactoryCreator(timePickerDriverFactory);

import {toggleSwitchDriverFactory, ToggleSwitchDriver} from '../components/ToggleSwitch/ToggleSwitch.protractor.driver';
export const toggleSwitchTestkitFactory = protractorTestkitFactoryCreator(toggleSwitchDriverFactory);

import {labelWithOptionsDriverFactory, LabelWithOptionsDriver} from '../components/LabelWithOptions/LabelWithOptions.protractor.driver';
export const labelWithOptionsTestkitFactory = protractorTestkitFactoryCreator(labelWithOptionsDriverFactory);

import {vBoxDriverFactory, VBoxDriver} from '../components/VBox/VBox.protractor.driver';
export const vBoxTestkitFactory = protractorTestkitFactoryCreator(vBoxDriverFactory);

import {thumbnailDriverFactory, ThumbnailDriver} from '../components/Thumbnail/Thumbnail.protractor.driver';
export const thumbnailTestkitFactory = protractorTestkitFactoryCreator(thumbnailDriverFactory);
