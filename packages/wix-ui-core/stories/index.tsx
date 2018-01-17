import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Text} from '../src/components/Text';
import {Button} from '../src/components/Button';
import {Badge} from '../src/components/Badge';
import {Input} from '../src/components/Input';
import {Box} from '../src/components/Box';
import {PaginationStory} from './Pagination/pagination-story';
import {DividerStory} from './Divider/divider-story';
import {TooltipStory} from './Tooltip/tooltip-story';
import {ToggleSwitchStory} from './ToggleSwitch/ToggleSwitch-story';
import {StylableToggleSwitchStory, BOStylableToggleSwitchStory} from './StylableToggleSwitch/StylableToggleSwitch-story';
import {IconWithOptions} from '../src/components/IconWithOptions';
import {InputWithOptions} from '../src/components/InputWithOptions';
import {OptionFactory} from '../src/baseComponents/DropdownOption';
import {GoogleMapsIframeClientStory} from './clients/GoogleMapsIframeClient-story';

const dropdownOptions =
    Array.from(Array(20))
      .map((x, index) =>
        index === 2 ? OptionFactory.createDivider() : OptionFactory.create(index, index === 3, true, index === 15 ? 'fdsf sdf sdf sdf sdf sdfsd fsdf sdf ds' : `value${index}`));

storiesOf('Components', module)
  .add('Badge', () => (
    <div style={{width: '50px'}}><Badge dataHook="story-badge">Hello</Badge></div>
  ))
  .add('Button', () => (
    <Button dataHook="story-button">Hello</Button>
  ))
  .add('IconWithOptions', () => (
    <IconWithOptions
      iconUrl="https://cdn3.iconfinder.com/data/icons/caps-hats/512/Ladies_cap-128.png"
      data-hook="story-icon-with-options"
      options={dropdownOptions}/>
  ))
  .add('InputWithOptions Single select', () => (
    <InputWithOptions
      data-hook="story-input-with-options-single"
      options={dropdownOptions}/>
  ))
  .add('InputWithOptions Multi select', () => (
    <InputWithOptions
      closeOnSelect={false}
      data-hook="story-input-with-options-multi"
      options={dropdownOptions}/>
  ))
  .add('Input', () => (
    <Input dataHook="story-input" />
  ))
  .add('ToggleSwitch', () => (
    <ToggleSwitchStory/>
  ))
  .add('BOStylableToggleSwitchStory', () => (
    <BOStylableToggleSwitchStory/>
  ))
  .add('StylableToggleSwitchStory', () => (
    <StylableToggleSwitchStory/>
  ))
  .add('Tooltip', () => (
    <TooltipStory />
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
    <hr />
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
    <hr />
    <Box lastItemTakesRemainingWidth>
      <div>label (input should take remaining width)</div>
      <input/>
    </Box>
    </div>
  ))
  .add('Pagination', () => (
    <PaginationStory />
  ))
    .add('GoogleMapsIframeClient', () => (
    <GoogleMapsIframeClientStory />
  ))
  .add('Divider', () => (
    <DividerStory />
  ));
