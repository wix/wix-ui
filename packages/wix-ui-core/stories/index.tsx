import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Text} from '../src/components/Text';
import {PaginationStory} from './Pagination/pagination-story';
import {DividerStory} from './Divider/divider-story';
import {GoogleMapsIframeClientStory} from './clients/GoogleMapsIframeClient-story';
import {CheckboxStory} from './Checkbox/Checkbox-story';
import {TooltipStory} from './Tooltip/custom';
import {RadioButtonStory} from './RadioButton';

require('./InputWithOptions').story();
require('./AddressInput').story();
require('./Autocomplete').story();
require('./Badge').story();
require('./Button').story();
require('./Input/Input.story');
require('./IconWithOptions').story();
require('./StylableText').story();
require('./Label').story();
require('./StylableBadge').story();
require('./Tooltip').story();
require('./Video').story();
require('./Slider').story();
require('./ToggleSwitch');
require('./AddressInput/E2E');
require('./TimePicker').story();

storiesOf('Components', module)
  .add('Text', () => (
    <Text ellipsis>
      Hello World
    </Text>
  ))
  .add('Pagination', () => (
    <PaginationStory/>
  ))
  .add('GoogleMapsIframeClient', () => (
    <GoogleMapsIframeClientStory/>
  ))
  .add('Divider', () => (
    <DividerStory />
  ))
  .add('Checkbox', () => (
    <CheckboxStory />
  ))
  .add('Tooltip Custom', () => (
    <TooltipStory />
  ))
  .add('RadioButton', () => (
    <RadioButtonStory />
  ));
