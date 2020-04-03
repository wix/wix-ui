import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { PaginationStory } from './Pagination/pagination-story';
import { DividerStory } from './Divider/divider-story';
import { LoadableStory } from './Loadable/loadable-story';
import { GoogleMapsIframeClientStory } from './clients/GoogleMapsIframeClient-story';
import { CheckboxStory } from './Checkbox/Checkbox-story';
import { TooltipStory } from './Tooltip/custom';
import { RadioButtonStory } from './RadioButton';
import EllipsedText, { CustomEllipsedText } from './EllipsedTooltip';
import Focusable from './Focusable';
import { FilePickerButtonTestFixture } from '../src/components/file-picker-button/test/FilePickerButtonTestFixture';
import { FocusableHOCTestFixture } from '../src/hocs/Focusable/test/FocusableHOCTestFixture';
import { InputWithOptionsTestFixture } from '../src/components/input-with-options/InputWithOptionsTestFixture';
import { SignatureInputTestFixture } from '../src/components/signature-input/test/SignatureInputTestFixture';
import { SIGNATURE_INPUT_METADATA } from '../src/components/signature-input/constants';
// import Backoffice stories
import AvatarStory from './backoffice/avatar';
import ButtonsStory from './backoffice/button-next';
import { Category } from './utils';

const Components = storiesOf(Category.COMPONENTS, module);
const Backoffice = storiesOf(Category.BACKOFFICE, module);
const HOCs = storiesOf(Category.HOCS, module);
const Tests = storiesOf(Category.TESTS, module);

// components (ordered alphabetically)
import './AddressInput/index.story';
import './AddressInput/E2E';
import './Autocomplete.story';
import '../src/components/avatar/avatar.story';
import './Button.story';
import '../src/components/button-next/button-next.story';
import './Captcha.story';
Components.add('Checkbox', () => <CheckboxStory />);
import './CircularProgressBar/index.story';
import './ClickOutside/index.story';
Components.add('Divider', () => <DividerStory />);
import '../src/components/file-picker-button/docs/FilePickerButton.story';
Components.add('GoogleMapsIframeClient', () => <GoogleMapsIframeClientStory />);
import '../src/components/horizontal-menu/docs/index.story';
Components.add('Loadable', () => <LoadableStory />);
import './Input/Input.story';
import './InputWithOptions.story';
import './Dropdown.story';
import '../src/components/ellipsis-tooltip/EllipsisTooltip.story';
import './IconWithOptions.story';
import './image/image.story';
import './MediaImage/MediaImage.story';
import './Label.story';
import './LabelWithOptions.story';
import './LinearProgressBar/index.story';
import './NavStepper.story';
Components.add('Pagination', () => <PaginationStory />);
import './Popover/Popover.story';
Components.add('RadioButton', () => <RadioButtonStory />);
import '../src/components/signature-input/docs/index.story';
import './Slider.story';
import './StylableBadge.story';
import './Thumbnail.story';
import './TimePicker/index.story';
import '../src/components/tags-list/docs/index.story';
import './ToggleSwitch/index.story';
import './Tooltip/index.story';
Components.add('Tooltip Custom', () => <TooltipStory />);
import '../src/components/video/Video.story';
HOCs.add('EllipsedTooltip', EllipsedText);
HOCs.add('Focusable', Focusable);

// BackOffice Theme
Backoffice.add('Avatar', AvatarStory);
Backoffice.add('Buttons', ButtonsStory);

// Tests
Tests.add('EllipsedTooltip', CustomEllipsedText);
Tests.add('FilePickerButton', () => <FilePickerButtonTestFixture />);
Tests.add('FocusableHOC', () => <FocusableHOCTestFixture />);
Tests.add('InputWithOptions', () => <InputWithOptionsTestFixture />);
Tests.add(SIGNATURE_INPUT_METADATA.displayName, () => (
  <SignatureInputTestFixture />
));
Tests.add(SIGNATURE_INPUT_METADATA.displayName + 'Color', () => (
  <SignatureInputTestFixture penColor="#0000FF" />
));
Tests.add(SIGNATURE_INPUT_METADATA.displayName + 'ColorInvalid', () => (
  <SignatureInputTestFixture penColor="invalid-color" />
));
Tests.add(SIGNATURE_INPUT_METADATA.displayName + 'Disabled', () => (
  <SignatureInputTestFixture disabled />
));
import '../src/components/ellipsis-tooltip/tests/EllipsisTooltipTests';
