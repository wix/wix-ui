import {
  testkitFactoryCreator,
  uniTestkitFactoryCreator
} from 'wix-ui-test-utils/vanilla';

import { inputDriverFactory } from '../components/input/Input.driver';
export const inputTestkitFactory = testkitFactoryCreator(inputDriverFactory);

import { paginationDriverFactory } from '../components/pagination/Pagination.driver';
export const paginationTestkitFactory = testkitFactoryCreator(
  paginationDriverFactory
);

import { tooltipDriverFactory } from '../components/tooltip/Tooltip.driver';
export const tooltipTestkitFactory = testkitFactoryCreator(
  tooltipDriverFactory
);

import { dividerDriverFactory } from '../components/deprecated/divider/Divider.driver';
export const dividerTestkitFactory = testkitFactoryCreator(
  dividerDriverFactory
);

import { checkboxDriverFactory } from '../components/checkbox/Checkbox.driver';
export const checkboxTestkitFactory = testkitFactoryCreator(
  checkboxDriverFactory
);

//Stylable
import { toggleSwitchDriverFactory } from '../components/toggle-switch/ToggleSwitch.driver';
export const toggleSwitchTestkitFactory = testkitFactoryCreator(
  toggleSwitchDriverFactory
);

import {
  buttonDriverFactory,
  ButtonDriver
} from '../components/deprecated/button/Button.driver';
export const buttonTestkitFactory = testkitFactoryCreator<ButtonDriver>(
  buttonDriverFactory
);
export { ButtonDriver };

import {
  buttonNextDriverFactory,
  ButtonNextDriver
} from '../components/button-next/button-next.driver';
export const buttonNextTestkitFactory = uniTestkitFactoryCreator<
  ButtonNextDriver
>(buttonNextDriverFactory);
export { ButtonNextDriver };

import {
  linearProgressBarDriverFactory,
  LinearProgressBarDriver
} from '../components/linear-progress-bar/LinearProgressBar.driver';
export const linearProgressBarTestkitFactory = testkitFactoryCreator<
  LinearProgressBarDriver
>(linearProgressBarDriverFactory);
export { LinearProgressBarDriver };

import {
  circularProgressBarDriverFactory,
  CircularProgressBarDriver
} from '../components/circular-progress-bar/CircularProgressBar.driver';
export const circularProgressBarTestkitFactory = testkitFactoryCreator<
  CircularProgressBarDriver
>(circularProgressBarDriverFactory);
export { CircularProgressBarDriver };

import {
  badgeDriverFactory as stylableBadgeDriverFactory,
  BadgeDriver as StylableBadgeDriver
} from '../components/deprecated/stylable-badge/Badge.driver';
export const stylableBadgeTestkitFactory = testkitFactoryCreator<
  StylableBadgeDriver
>(stylableBadgeDriverFactory);
export { StylableBadgeDriver };

import { radioButtonDriverFactory } from '../components/radio-button/RadioButton.driver';
export const radioButtonTestkitFactory = testkitFactoryCreator(
  radioButtonDriverFactory
);

import { autocompleteDriverFactory } from '../components/autocomplete/Autocomplete.driver';
export const autocompleteTestkitFactory = testkitFactoryCreator(
  autocompleteDriverFactory
);

import { sliderDriverFactory } from '../components/slider/Slider.driver';
export const sliderTestkitFactory = testkitFactoryCreator(sliderDriverFactory);

import { addressInputDriverFactory } from '../components/address-input/AddressInput.driver';
export const addressInputTestkitFactory = testkitFactoryCreator(
  addressInputDriverFactory
);

import { labelDriverFactory } from '../components/deprecated/label/Label.driver';
export const labelTestkitFactory = testkitFactoryCreator(labelDriverFactory);

import { timePickerDriverFactory } from '../components/time-picker/TimePicker.driver';
export const timePickerTestkitFactory = testkitFactoryCreator(
  timePickerDriverFactory
);

import { labelWithOptionsDriverFactory } from '../components/label-with-options/LabelWithOptions.driver';
export const labelWithOptionsTestkitFactory = testkitFactoryCreator(
  labelWithOptionsDriverFactory
);

import {
  thumbnailDriverFactory,
  ThumbnailDriver
} from '../components/thumbnail/Thumbnail.driver';
export const thumbnailTestkitFactory = testkitFactoryCreator<ThumbnailDriver>(
  thumbnailDriverFactory
);
export { ThumbnailDriver };

import { popoverDriverFactory } from '../components/popover/Popover.driver';
export const popoverTestkitFactory = testkitFactoryCreator(
  popoverDriverFactory
);
