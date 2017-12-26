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

storiesOf('Components', module)
  .add('Badge', () => (
    <div style={{width: '50px'}}><Badge dataHook="story-badge">Hello</Badge></div>
  ))
  .add('Button', () => (
    <Button dataHook="story-button">Hello</Button>
  ))
  .add('Input', () => (
    <Input dataHook="story-input" />
  ))
  .add('ToggleSwitch', () => (
    <ToggleSwitch dataHook="story-toggle-switch"/>
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
