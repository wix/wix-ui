import * as React from 'react';
import {storiesOf} from '@storybook/react';
import Text from '../src/components/Text';
import Button from '../src/components/Button';
import Badge from '../src/components/Badge';
import Input from '../src/components/Input';
import VBox from '../src/components/VBox';
import HBox from '../src/components/HBox';
import Tooltip from '../src/components/Tooltip';
import {PaginationStory} from './Pagination/pagination-story';
import {DividerStory} from './Divider/divider-story';
import {ToggleSwitchStory} from './ToggleSwitch/ToggleSwitch-story';
import {StylableToggleSwitchStory, BOStylableToggleSwitchStory} from './StylableToggleSwitch/StylableToggleSwitch-story';
import IconWithOptions from '../src/components/IconWithOptions';

const dropdownOptions = [1, 2, 3, 4, 5].map(x => ({
  id: x,
  value: `value${x}`,
  displayName: `value ${x}`,
  type: x === 3 ? 'separator' : 'option',
  isDisabled: x === 4
}));

storiesOf('Components', module)
  .add('Badge', () => (
    <div style={{width: '50px'}}><Badge dataHook="story-badge">Hello</Badge></div>
  ))
  .add('Button', () => (
    <Button dataHook="story-button">Hello</Button>
  ))
  .add('IconWithOptions', () => (
    <div style={{padding: '50px'}}>
      <IconWithOptions
        iconUrl="https://cdn3.iconfinder.com/data/icons/caps-hats/512/Ladies_cap-128.png"
        dataHook="story-icon-with-options"
        options={dropdownOptions}/>
    </div>
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
    <Tooltip dataHook="story-tooltip" placement="right">
      <Tooltip.Element>
        <span>I need a tooltip</span>
      </Tooltip.Element>
      <Tooltip.Content>
        <span>This is my tooltip!</span>
      </Tooltip.Content>
    </Tooltip>
  ))
  .add('Text', () => (
    <Text ellipsis>
        Hello World
    </Text>
  ))
  .add('VBox', () => (
    <VBox>
        <div>a</div>
        <div>b</div>
        <div>c</div>
    </VBox>
  ))
  .add('HBox', () => (
    <HBox>
        <div>a</div>
        <div>b</div>
        <div>c</div>
    </HBox>
  ))
  .add('Pagination', () => (
    <PaginationStory />
  ))
  .add('Divider', () => (
    <DividerStory />
  ));
