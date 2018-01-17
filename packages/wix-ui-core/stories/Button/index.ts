import 'react';
import createStory from '../create-story';

import {Button} from '../../src/components/Button';
import * as ButtonSource from '!raw-loader!../../src/components/Button/Button.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'Button',
  storyName: 'Button',
  component: Button,
  componentProps: () => ({
    disabled: false,
    type: 'button',
    children: 'I\'m a Button!',
    dataHook: 'storybook-button'
  }),
  exampleProps: {
    onClick: () => 'Clicked!',
    onMouseEnter: () => 'Mouse Enter!',
    onMouseLeave: () => 'Mouse Leave!',
  },
  source: ButtonSource
});
