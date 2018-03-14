import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Text} from '../src/components/Text';
import {Box} from '../src/components/Box';
import {PaginationStory} from './Pagination/pagination-story';
import {DividerStory} from './Divider/divider-story';
import {ToggleSwitchStory} from './ToggleSwitch/ToggleSwitch-story';
import {InputWithOptions} from '../src/baseComponents/InputWithOptions';
import {OptionFactory} from '../src/baseComponents/DropdownOption';
import {GoogleMapsIframeClientStory} from './clients/GoogleMapsIframeClient-story';
import {CheckboxStory} from './Checkbox/Checkbox-story';
import {TooltipStory} from './Tooltip/custom';
import {RadioButtonStory} from './RadioButton';

require('./AddressInput').story();
require('./InputWithOptions').story();
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

storiesOf('Components', module)
  .add('ToggleSwitch', () => (
    <ToggleSwitchStory/>
  ))
  .add('Text', () => (
    <Text ellipsis>
      Hello World
    </Text>
  ))
  .add('Box', () => (
    <div>
      <Box vertical>
        <div>v</div>
        <div>e</div>
        <div>r</div>
        <div>t</div>
        <div>i</div>
        <div>c</div>
        <div>a</div>
        <div>l</div>
      </Box>
      <hr/>
      <Box>
        <div>h</div>
        <div>o</div>
        <div>r</div>
        <div>i</div>
        <div>z</div>
        <div>o</div>
        <div>n</div>
        <div>t</div>
        <div>a</div>
        <div>l</div>
      </Box>
      <hr/>
      <Box lastItemTakesRemainingWidth>
        <div>label (input should take remaining width)</div>
        <input/>
      </Box>
    </div>
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
