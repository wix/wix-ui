import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ToggleSwitch from '../src/components/ToggleSwitch';
import Text from '../src/components/Text';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import VBox from '../src/components/VBox';
import HBox from '../src/components/HBox';
import Popover from '../src/components/Popover';

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
