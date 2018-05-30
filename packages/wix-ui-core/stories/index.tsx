import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {PaginationStory} from './Pagination/pagination-story';
import {DividerStory} from './Divider/divider-story';
import {GoogleMapsIframeClientStory} from './clients/GoogleMapsIframeClient-story';
import {CheckboxStory} from './Checkbox/Checkbox-story';
import {TooltipStory} from './Tooltip/custom';
import {RadioButtonStory} from './RadioButton';

// baseComponents
import './InputWithOptions.story';

// components
import './AddressInput/index.story';
import './AddressInput/E2E';
import './Autocomplete.story';
import './Button.story';
import './Input/Input.story';
import './IconWithOptions.story';
import './LabelWithOptions.story';
import './Slider.story';
import './Label.story';
import './Link.story';
import './StylableBadge.story';
import './TimePicker/index.story';
import './ToggleSwitch/index.story';
import './Tooltip/index.story';
import './Video.story';
import './Thumbnail.story';
import './Popover.story';

storiesOf('Components', module)
  .add('Pagination', () => <PaginationStory/>)
  .add('GoogleMapsIframeClient', () => <GoogleMapsIframeClientStory/>)
  .add('Divider', () => <DividerStory/>)
  .add('Checkbox', () => <CheckboxStory/>)
  .add('Tooltip Custom', () => <TooltipStory/>)
  .add('RadioButton', () => <RadioButtonStory/>);
