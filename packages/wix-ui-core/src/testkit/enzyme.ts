import {
  enzymeTestkitFactoryCreator,
  WrapperData
} from "wix-ui-test-utils/enzyme";

import { inputDriverFactory } from "../components/Input/Input.driver";
//Ugly workaround for now
export const inputTestkitFactory: (
  obj: WrapperData
) => any = enzymeTestkitFactoryCreator(inputDriverFactory);

import { badgeDriverFactory } from "../components/Badge/Badge.driver";
export const badgeTestkitFactory = enzymeTestkitFactoryCreator(
  badgeDriverFactory
);

import { tooltipDriverFactory } from "../components/Tooltip/Tooltip.driver";
export const tooltipTestkitFactory = enzymeTestkitFactoryCreator(
  tooltipDriverFactory
);

import { linearProgressBarDriverFactory, LinearProgressBarDriver } from "../components/LinearProgressBar/LinearProgressBar.driver";
export const linearProgressBarTestkitFactory = enzymeTestkitFactoryCreator<LinearProgressBarDriver>(
  linearProgressBarDriverFactory
);
export { LinearProgressBarDriver };

import { circularProgressBarDriverFactory, CircularProgressBarDriver } from "../components/CircularProgressBar/CircularProgressBar.driver";
export const circularProgressBarTestkitFactory = enzymeTestkitFactoryCreator<CircularProgressBarDriver>(
  circularProgressBarDriverFactory
);
export { CircularProgressBarDriver };

import { paginationDriverFactory } from "../components/Pagination/Pagination.driver";
export const paginationTestkitFactory = enzymeTestkitFactoryCreator(
  paginationDriverFactory
);

import { dividerDriverFactory } from "../components/Divider/Divider.driver";
export const dividerTestkitFactory = enzymeTestkitFactoryCreator(
  dividerDriverFactory
);

import { checkboxDriverFactory } from "../components/Checkbox/Checkbox.driver";
export const checkboxTestkitFactory = enzymeTestkitFactoryCreator(
  checkboxDriverFactory
);

// Stylable
import { toggleSwitchDriverFactory } from "../components/ToggleSwitch/ToggleSwitch.driver";
export const toggleSwitchTestkitFactory = enzymeTestkitFactoryCreator(
  toggleSwitchDriverFactory
);

import {
  buttonDriverFactory,
  ButtonDriver
} from "../components/Button/Button.driver";
export const buttonTestkitFactory = enzymeTestkitFactoryCreator<ButtonDriver>(
  buttonDriverFactory
);
export { ButtonDriver };

import {
  badgeDriverFactory as stylableBadgeDriverFactory,
  BadgeDriver as StylableBadgeDriver
} from "../components/StylableBadge/Badge.driver";
export const stylableBadgeTestkitFactory = enzymeTestkitFactoryCreator<
  StylableBadgeDriver
>(stylableBadgeDriverFactory);
export { StylableBadgeDriver };

import { radioButtonDriverFactory } from "../components/RadioButton/RadioButton.driver";
export const radioButtonTestkitFactory = enzymeTestkitFactoryCreator(
  radioButtonDriverFactory
);

import { autocompleteDriverFactory } from "../components/Autocomplete/Autocomplete.driver";
export const autocompleteTestkitFactory = enzymeTestkitFactoryCreator(
  autocompleteDriverFactory
);

import { sliderDriverFactory } from "../components/Slider/Slider.driver";
export const sliderTestkitFactory = enzymeTestkitFactoryCreator(
  sliderDriverFactory
);

import { addressInputDriverFactory } from "../components/AddressInput/AddressInput.driver";
export const addressInputTestkitFactory = enzymeTestkitFactoryCreator(
  addressInputDriverFactory
);

import { labelDriverFactory } from "../components/Label/Label.driver";
export const labelTestkitFactory = enzymeTestkitFactoryCreator(
  labelDriverFactory
);

import { timePickerDriverFactory } from "../components/TimePicker/TimePicker.driver";
export const timePickerTestkitFactory = enzymeTestkitFactoryCreator(
  timePickerDriverFactory
);

import { labelWithOptionsDriverFactory } from "../components/LabelWithOptions/LabelWithOptions.driver";
export const labelWithOptionsTestkitFactory = enzymeTestkitFactoryCreator(
  labelWithOptionsDriverFactory
);

import {
  thumbnailDriverFactory,
  ThumbnailDriver
} from "../components/Thumbnail/Thumbnail.driver";
export const thumbnailTestkitFactory = enzymeTestkitFactoryCreator<
  ThumbnailDriver
>(thumbnailDriverFactory);
export { ThumbnailDriver };

import { popoverDriverFactory } from "../components/Popover/Popover.driver";
export const popoverTestkitFactory = enzymeTestkitFactoryCreator(
  popoverDriverFactory
);

import { linkDriverFactory } from "../components/Link/Link.driver";
export const linkTestkitFactory = enzymeTestkitFactoryCreator(
  linkDriverFactory
);

import {navStepperDriverFactory, NavStepperDriver} from '../components/NavStepper/NavStepper.driver';
export const navStepperTestkitFactory = enzymeTestkitFactoryCreator(navStepperDriverFactory);
export {NavStepperDriver};