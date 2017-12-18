import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ToggleSwitch from '../src/components/ToggleSwitch';
import Text from '../src/components/Text';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import VBox from '../src/components/VBox';
import HBox from '../src/components/HBox';
import Popover from '../src/components/Popover';
import Tooltip from '../src/components/Tooltip';

storiesOf('Components', module)
  .add('Button', () => (
    <Button>Hello</Button>
  ))
  .add('Input', () => (
    <Input dataHook="story-input" />
  ))
  .add('Popover', () => (
    <Popover placement="top">
      <Popover.Element>
      <div>
        Element
      </div>
    </Popover.Element>
    <Popover.Content>
        <div>
          Content
        </div>
      </Popover.Content>
    </Popover>
  ))
  .add('Tooltip', () => (
    <Tooltip placement="right">
      <Tooltip.Element>
        <div style={{width: '250px', height: '250px', backgroundColor: 'red'}}>
          Element
        </div>
      </Tooltip.Element>
      <Tooltip.Content>
        <div style={{width: '200px', backgroundColor: 'black', color: 'white'}}>
            This is the tooltip content
        </div>
      </Tooltip.Content>
    </Tooltip>
  ))
  .add('ToggleSwitch', () => (
    <ToggleSwitch/>
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
