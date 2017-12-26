import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ToggleSwitch from '../src/components/ToggleSwitch';
import Text from '../src/components/Text';
import Button from '../src/components/Button';
import Badge from '../src/components/Badge';
import Input from '../src/components/Input';
import VBox from '../src/components/VBox';
import HBox from '../src/components/HBox';
import Tooltip from '../src/components/Tooltip';
import Dropdown from '../src/components/Dropdown';

storiesOf('Components', module)
  .add('Badge', () => (
    <div style={{width: '50px'}}><Badge dataHook="story-badge">Hello</Badge></div>
  ))
  .add('Button', () => (
    <Button dataHook="story-button">Hello</Button>
  ))
  .add('Dropdown', () => {
    const dropdownOptions = [1, 2, 3, 4, 5].map(x => ({
      id: x,
      value: `value${x}`,
      displayName: `value ${x}`,
      type: x === 3 ? 'separator' : 'option',
      isDisabled: x === 4
    }));

    return (
      <div>
        <Dropdown dataHook="story-dropdown" options={dropdownOptions} selectedId={1}>
          {(state) => <span>Dropdown with click</span>}
        </Dropdown>
        <div style={{display: 'inline-block', width: '20px'}} />
        <Dropdown dataHook="story-dropdown" openTrigger="hover" selectedIds={[1, 2, 6]} options={dropdownOptions}>
          {(state) => <span>Dropdown with hover</span>}
        </Dropdown>
      </div>
    );
  })
  .add('Input', () => (
    <Input dataHook="story-input" />
  ))
  .add('ToggleSwitch', () => (
    <ToggleSwitch dataHook="story-toggle-switch">Hello</ToggleSwitch>
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
  ));
