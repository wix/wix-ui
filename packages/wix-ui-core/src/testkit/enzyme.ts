import {
  enzymeTestkitFactoryCreator,
  enzymeUniTestkitFactoryCreator,
  WrapperData
} from 'wix-ui-test-utils/enzyme';

import { inputDriverFactory } from '../components/input/Input.driver';
//Ugly workaround for now
export const inputTestkitFactory: (
  obj: WrapperData
) => any = enzymeTestkitFactoryCreator(inputDriverFactory);

import { tooltipDriverFactory } from '../components/tooltip/Tooltip.driver';
export const tooltipTestkitFactory = enzymeTestkitFactoryCreator(
  tooltipDriverFactory
);

import {
  linearProgressBarDriverFactory,
  LinearProgressBarDriver
} from '../components/linear-progress-bar/LinearProgressBar.driver';
export const linearProgressBarTestkitFactory = enzymeTestkitFactoryCreator<
  LinearProgressBarDriver
>(linearProgressBarDriverFactory);
export { LinearProgressBarDriver };

import {
  circularProgressBarDriverFactory,
  CircularProgressBarDriver
} from '../components/circular-progress-bar/CircularProgressBar.driver';
export const circularProgressBarTestkitFactory = enzymeTestkitFactoryCreator<
  CircularProgressBarDriver
>(circularProgressBarDriverFactory);
export { CircularProgressBarDriver };

import { paginationDriverFactory } from '../components/pagination/Pagination.driver';
export const paginationTestkitFactory = enzymeTestkitFactoryCreator(
  paginationDriverFactory
);

import { dividerDriverFactory } from '../components/deprecated/divider/Divider.driver';
export const dividerTestkitFactory = enzymeTestkitFactoryCreator(
  dividerDriverFactory
);

import { checkboxDriverFactory } from '../components/checkbox/Checkbox.driver';
export const checkboxTestkitFactory = enzymeTestkitFactoryCreator(
  checkboxDriverFactory
);

// Stylable
import { toggleSwitchDriverFactory } from '../components/toggle-switch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = enzymeTestkitFactoryCreator(
  toggleSwitchDriverFactory
);

import {
  buttonDriverFactory,
  ButtonDriver
} from '../components/deprecated/button/Button.driver';
export const buttonTestkitFactory = enzymeTestkitFactoryCreator<ButtonDriver>(
  buttonDriverFactory
);
export { ButtonDriver };

import {
  buttonNextDriverFactory,
  ButtonNextDriver
} from '../components/button-next/button-next.driver';
export const buttonNextTestkitFactory = enzymeUniTestkitFactoryCreator<
  ButtonNextDriver
>(buttonNextDriverFactory);
export { ButtonNextDriver };

import {
  badgeDriverFactory as stylableBadgeDriverFactory,
  BadgeDriver as StylableBadgeDriver
} from '../components/deprecated/stylable-badge/Badge.driver';
export const stylableBadgeTestkitFactory = enzymeTestkitFactoryCreator<
  StylableBadgeDriver
>(stylableBadgeDriverFactory);
export { StylableBadgeDriver };

import { radioButtonDriverFactory } from '../components/radio-button/RadioButton.driver';
export const radioButtonTestkitFactory = enzymeTestkitFactoryCreator(
  radioButtonDriverFactory
);

import { autocompleteDriverFactory } from '../components/autocomplete/Autocomplete.driver';
export const autocompleteTestkitFactory = enzymeTestkitFactoryCreator(
  autocompleteDriverFactory
);

import { sliderDriverFactory } from '../components/slider/Slider.driver';
export const sliderTestkitFactory = enzymeTestkitFactoryCreator(
  sliderDriverFactory
);

import { addressInputDriverFactory } from '../components/address-input/AddressInput.driver';
export const addressInputTestkitFactory = enzymeTestkitFactoryCreator(
  addressInputDriverFactory
);

import { labelDriverFactory } from '../components/deprecated/label/Label.driver';
export const labelTestkitFactory = enzymeTestkitFactoryCreator(
  labelDriverFactory
);

import { timePickerDriverFactory } from '../components/time-picker/TimePicker.driver';
export const timePickerTestkitFactory = enzymeTestkitFactoryCreator(
  timePickerDriverFactory
);

import { labelWithOptionsDriverFactory } from '../components/label-with-options/LabelWithOptions.driver';
export const labelWithOptionsTestkitFactory = enzymeTestkitFactoryCreator(
  labelWithOptionsDriverFactory
);

import {
  thumbnailDriverFactory,
  ThumbnailDriver
} from '../components/thumbnail/Thumbnail.driver';
export const thumbnailTestkitFactory = enzymeTestkitFactoryCreator<
  ThumbnailDriver
>(thumbnailDriverFactory);
export { ThumbnailDriver };

import { popoverDriverFactory } from '../components/popover/Popover.driver';
export const popoverTestkitFactory = enzymeTestkitFactoryCreator(
  popoverDriverFactory
);

import {
  navStepperDriverFactory,
  NavStepperDriver
} from '../components/nav-stepper/NavStepper.driver';
export const navStepperTestkitFactory = enzymeTestkitFactoryCreator(
  navStepperDriverFactory
);
export { NavStepperDriver };
