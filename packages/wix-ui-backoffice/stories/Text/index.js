import createStory from '../create-story';
import Text from '../../src/components/Text';
import TextSource from '!raw-loader!../../src/components/Text';

export const story = () => createStory({
  category: 'Components',
  name: 'Text',
  storyName: 'Text',
  component: Text,
  componentProps: (setState, getState) => ({
    appearance: 'T1.1',
    ellipsis: true,
    forceHideTitle: false,
    children: 'Some text'
  }),
  source: TextSource
});
