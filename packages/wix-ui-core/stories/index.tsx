import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Text} from '../src/components/Text';
import {PaginationStory} from './Pagination/pagination-story';
import {DividerStory} from './Divider/divider-story';
import {ToggleSwitchStory} from './ToggleSwitch/ToggleSwitch-story';
import {GoogleMapsIframeClientStory} from './clients/GoogleMapsIframeClient-story';
import {CheckboxStory} from './Checkbox/Checkbox-story';
import {TooltipStory} from './Tooltip/custom';
import {RadioButtonStory} from './RadioButton';

require('./InputWithOptions').story();
require('./AddressInput').story();
require('./Autocomplete').story();
require('./Badge').story();
require('./Button').story();
require('./Input.story.js');
require('./IconWithOptions').story();
require('./InputWithAffixes').story();
require('./StylableText').story();
require('./StylableBadge').story();
require('./Tooltip').story();
require('./Video').story();
require('./Slider').story();
require('./StylableToggleSwitch/index.story.ts');
require('./AddressInput/E2E');

storiesOf('Components', module)
  .add('ToggleSwitch', () => (
    <ToggleSwitchStory/>
  ))
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
