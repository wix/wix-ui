import createStory from '../create-story';

import Input from '../../src/components/Input';
import InputSource from '!raw-loader!../../src/components/Input';

export const story = () => createStory({
  category: 'Components',
  name: 'Input',
  storyName: 'Input',
  component: Input,
  source: InputSource
});
