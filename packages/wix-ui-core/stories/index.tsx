import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ToggleSwitch from '../src/components/ToggleSwitch';
import Text from '../src/components/Text';
import Button from '../src/components/Button';
import Pagination from '../src/components/Pagination';
import Input from '../src/components/Input';
import VBox from '../src/components/VBox';
import HBox from '../src/components/HBox';

storiesOf('Components', module)
  .add('Button', () => (
    <Button>Hello</Button>
  ))
  .add('Input', () => (
    <Input dataHook="story-input" />
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
  ))
  .add('Pagination', () => (
    <Pagination numOfPages={13} roomForXPages={6} currentPage={4} showFirstLastButtons onChange={(e) => {console.log(e)}}/>
  ));
