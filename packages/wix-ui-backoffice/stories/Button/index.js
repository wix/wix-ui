import createStory from '../create-story';

import Button from '../../src/components/Button';
import ButtonSource from '!raw-loader!../../src/components/Button';

export const story = () => createStory({
  category: 'Components',
  name: 'Button',
  storyName: 'Button',
  component: Button,
  componentProps: (setState, getState) => ({
    children: 'Click me'
  }),
  source: ButtonSource
});
