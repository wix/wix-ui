import 'react';
import createStory from '../create-story';

import {Text} from '../../src/components/StylableText';
import * as TextSource from '!raw-loader!../../src/components/StylableText/Text.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'Text',
  storyName: 'StylableText',
  component: Text,
  componentProps: (setState) => ({
    'data-hook': 'storybook-text',
    ellipsis: true,
    children: 'hello'
  }),
  source: TextSource
});
