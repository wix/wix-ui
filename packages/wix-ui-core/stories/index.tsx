import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ToggleSwitch from '../src/components/ToggleSwitch';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import Hbox from '../src/components/HBox';

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
  .add('Hbox', () => (
    <div style={{width: '200px', height: '200px', background: 'grey'}}>
      <Hbox spacing="12px">
        <div style={{width: '50px'}}>a</div>
        <div style={{width: '50px'}}>b</div>
        <div style={{width: '50px'}}>c</div>
      </Hbox>
    </div>
  ));
