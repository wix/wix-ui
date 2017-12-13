import createStory from '../create-story';
import Heading from '../../src/components/Heading';
import HeadingSource from '!raw-loader!../../src/components/Heading';

export const story = () => createStory({
  category: 'Components',
  name: 'Heading',
  storyName: 'Heading',
  component: Heading,
  componentProps: () => ({
    appearance: 'H0',
    skin: 'dark',
    children: 'Some text'
  }),
  source: HeadingSource
});
