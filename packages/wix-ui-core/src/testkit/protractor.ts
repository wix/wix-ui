import {
  protractorTestkitFactoryCreator,
  protractorUniTestkitFactoryCreator
} from 'wix-ui-test-utils/protractor';

import {
  avatarDriverFactory,
  AvatarDriver
} from '../components/avatar/avatar.driver';
export const avatarTestkitFactory = protractorUniTestkitFactoryCreator(
  avatarDriverFactory
);
export { AvatarDriver };

import {
  buttonDriverFactory,
  ButtonDriver
} from '../components/deprecated/button/Button.protractor.driver';
export const buttonTestkitFactory = protractorTestkitFactoryCreator(
  buttonDriverFactory
);
export { ButtonDriver };

import {
  buttonNextDriverFactory,
  ButtonNextDriver
} from '../components/button-next/button-next.driver';
export const buttonNextTestkitFactory = protractorUniTestkitFactoryCreator(
  buttonNextDriverFactory
);
export { ButtonNextDriver };

//JSS
import {
  popoverDriverFactory,
  PopoverDriver
} from '../components/popover/Popover.protractor.driver';
export const popoverTestkitFactory = protractorTestkitFactoryCreator(
  popoverDriverFactory
);
export { PopoverDriver };

import {
  inputDriverFactory,
  InputDriver
} from '../components/input/Input.protractor.driver';
export const inputTestkitFactory = protractorTestkitFactoryCreator(
  inputDriverFactory
);
export { InputDriver };

import {
  paginationDriverFactory,
  PaginationDriver
} from '../components/pagination/Pagination.protractor.driver';
export const paginationTestkitFactory = protractorTestkitFactoryCreator(
  paginationDriverFactory
);
export { PaginationDriver };

import {
  tooltipDriverFactory,
  TooltipDriver
} from '../components/tooltip/Tooltip.protractor.driver';
export const tooltipTestkitFactory = protractorTestkitFactoryCreator(
  tooltipDriverFactory
);
export { TooltipDriver };

import {
  dividerDriverFactory,
  DividerDriver
} from '../components/deprecated/divider/Divider.protractor.driver';
export const dividerTestkitFactory = protractorTestkitFactoryCreator(
  dividerDriverFactory
);
export { DividerDriver };

import {
  googleMapsIframeClientDriverFactory,
  GoogleMapsIframeClientDriver
} from '../clients/GoogleMaps/GoogleMapsIframeClient.protractor.driver';
export const googleMapsIframeClientTestkitFactory = protractorTestkitFactoryCreator(
  googleMapsIframeClientDriverFactory
);
export { GoogleMapsIframeClientDriver };

import {
  checkboxDriverFactory,
  CheckboxDriver
} from '../components/checkbox/Checkbox.protractor.driver';
export const checkboxTestkitFactory = protractorTestkitFactoryCreator(
  checkboxDriverFactory
);
export { CheckboxDriver };

import {
  linearProgressBarDriverFactory,
  LinearProgressBarDriver
} from '../components/linear-progress-bar/LinearProgressBar.protractor.driver';
export const linearProgressBarTestkitFactory = protractorTestkitFactoryCreator(
  linearProgressBarDriverFactory
);
export { LinearProgressBarDriver };

import {
  circularProgressBarDriverFactory,
  CircularProgressBarDriver
} from '../components/circular-progress-bar/CircularProgressBar.protractor.driver';
export const circularProgressBarTestkitFactory = protractorTestkitFactoryCreator(
  circularProgressBarDriverFactory
);
export { CircularProgressBarDriver };

//Stylable
import {
  radioButtonDriverFactory,
  RadioButtonDriver
} from '../components/radio-button/RadioButton.protractor.driver';
export const radioButtonTestkitFactory = protractorTestkitFactoryCreator(
  radioButtonDriverFactory
);
export { RadioButtonDriver };

import {
  badgeDriverFactory as stylableBadgeDriverFactory,
  BadgeDriver as StylableBadgeDriver
} from '../components/deprecated/stylable-badge/Badge.protractor.driver';
export const stylablebadgeTestkitFactory = protractorTestkitFactoryCreator(
  stylableBadgeDriverFactory
);
export { StylableBadgeDriver };

import {
  autocompleteDriverFactory,
  AutocompleteDriver
} from '../components/autocomplete/Autocomplete.protractor.driver';
export const autocompleteTestkitFactory = protractorTestkitFactoryCreator(
  autocompleteDriverFactory
);
export { AutocompleteDriver };

import {
  sliderDriverFactory,
  SliderDriver
} from '../components/slider/Slider.protractor.driver';
export const sliderTestkitFactory = protractorTestkitFactoryCreator(
  sliderDriverFactory
);
export { SliderDriver };

import {
  addressInputDriverFactory,
  AddressInputDriver
} from '../components/address-input/AddressInput.protractor.driver';
export const addressInputTestkitFactory = protractorTestkitFactoryCreator(
  addressInputDriverFactory
);
export { AddressInputDriver };

import {
  labelDriverFactory,
  LabelDriver
} from '../components/deprecated/label/Label.protractor.driver';
export const labelTestkitFactory = protractorTestkitFactoryCreator(
  labelDriverFactory
);
export { LabelDriver };

import {
  timePickerDriverFactory,
  TimePickerDriver
} from '../components/time-picker/TimePicker.protractor.driver';
export const timePickerTestkitFactory = protractorTestkitFactoryCreator(
  timePickerDriverFactory
);
export { TimePickerDriver };

import {
  toggleSwitchDriverFactory,
  ToggleSwitchDriver
} from '../components/toggle-switch/ToggleSwitch.protractor.driver';
export const toggleSwitchTestkitFactory = protractorTestkitFactoryCreator(
  toggleSwitchDriverFactory
);
export { ToggleSwitchDriver };

import {
  labelWithOptionsDriverFactory,
  LabelWithOptionsDriver
} from '../components/label-with-options/LabelWithOptions.protractor.driver';
export const labelWithOptionsTestkitFactory = protractorTestkitFactoryCreator(
  labelWithOptionsDriverFactory
);
export { LabelWithOptionsDriver };

import {
  thumbnailDriverFactory,
  ThumbnailDriver
} from '../components/thumbnail/Thumbnail.protractor.driver';
export const thumbnailTestkitFactory = protractorTestkitFactoryCreator<
  ThumbnailDriver
>(thumbnailDriverFactory);
export { ThumbnailDriver };

import {
  navStepperDriverFactory,
  NavStepperDriver
} from '../components/nav-stepper/NavStepper.protractor.driver';
export const navStepperTestkitFactory = protractorTestkitFactoryCreator(
  navStepperDriverFactory
);
export { NavStepperDriver };
