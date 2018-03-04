import 'react';
import createStory from '../create-story';

import {Text} from '../../src/components/Text';
import * as TextSource from '!raw-loader!../../src/components/Text/Text.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'Text',
  storyName: 'Text',
  component: Text,
  componentProps: (setState) => ({
    'data-hook': 'storybook-text',
    ellipsis: true,
    children: 'hello'
  }),
  source: TextSource
});
