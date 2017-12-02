import * as React from 'react';
import {storiesOf} from '@storybook/react';
import * as ToggleSwitch from '../src/components/ToggleSwitch';
import * as Button from '../src/components/Button';

storiesOf('Components', module)
  .add('Button', () => (
    <Button>Hello</Button>
  ))
  .add('ToggleSwitch', () => (
    <ToggleSwitch/>
  ));
