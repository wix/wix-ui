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

// components (ordered alphabetically)
import './AddressInput/index.story';
import './AddressInput/E2E';
import './Autocomplete.story';
import './Button.story';
storiesOf('Components', module).add('Checkbox', () => <CheckboxStory/>);
storiesOf('Components', module).add('Divider', () => <DividerStory/>);
storiesOf('Components', module).add('GoogleMapsIframeClient', () => <GoogleMapsIframeClientStory/>);
import './Input/Input.story';
import './IconWithOptions.story';
import './Label.story';
import './LabelWithOptions.story';
import './Link.story';
storiesOf('Components', module).add('Pagination', () => <PaginationStory/>);
import './Popover.story';
storiesOf('Components', module).add('RadioButton', () => <RadioButtonStory/>);
import './Slider.story';
import './StylableBadge.story';
import './Thumbnail.story';
import './TimePicker/index.story';
import './ToggleSwitch/index.story';
import './Tooltip/index.story';
storiesOf('Components', module).add('Tooltip Custom', () => <TooltipStory/>);
import './Video.story';

