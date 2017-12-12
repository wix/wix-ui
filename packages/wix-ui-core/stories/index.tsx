import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ToggleSwitch from '../src/components/ToggleSwitch';
import Button from '../src/components/Button';
import Pagination from '../src/components/Pagination';
import Input from '../src/components/Input';

storiesOf('Components', module)
  .add('Button', () => (
    <Button>Hello</Button>
  ))
  .add('Input', () => (
    <Input />
  ))
  .add('ToggleSwitch', () => (
    <ToggleSwitch/>
  ))
  .add('Pagination', () => (
    <Pagination numOfPages={13} roomForXPages={6} currentPage={4} showFirstLastButtons onChange={(e) => {console.log(e)}}/>
  ));
