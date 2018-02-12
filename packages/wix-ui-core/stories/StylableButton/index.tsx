import * as React from 'react';
import createStory from '../create-story';

import {Button} from '../../src/components/StylableButton';
import * as StylableButtonSource from '!raw-loader!../../src/components/StylableButton/Button.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'StylableButton',
  storyName: 'StylableButton',
  component: Button,
  componentProps: () => ({
    disabled: false,
    type: 'button',
    children: 'I\'m a Stylable Button!',
    dataHook: 'storybook-StylableButton'
  }),
  exampleProps: {
    onClick: () => 'Clicked!',
    onMouseEnter: () => 'Mouse Enter!',
    onMouseLeave: () => 'Mouse Leave!',
  },
  source: StylableButtonSource
});
