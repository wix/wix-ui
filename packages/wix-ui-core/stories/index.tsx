import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ToggleSwitch from '../src/components/ToggleSwitch';
import Text from '../src/components/Text';
import Button from '../src/components/Button';

storiesOf('Components', module)
  .add('Button', () => (
    <Button>Hello</Button>
  ))
  .add('ToggleSwitch', () => (
    <ToggleSwitch/>
  ))
  .add('Text', () => (
    <Text>
        Hello World
    </Text>
  ));
