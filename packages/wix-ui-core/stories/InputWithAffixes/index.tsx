import * as React from 'react';
import createStory from '../create-story';

import {InputWithAffixes} from '../../src/components/InputWithAffixes';
import * as InputSource from '!raw-loader!../../src/components/InputWithAffixes/index.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'InputWithAffixes',
  storyName: 'InputWithAffixes',
  component: InputWithAffixes,
  componentProps: (setState) => ({
    'data-hook': 'storybook-input-affix',
    value: '',
    onChange: ({target: {value}}) => setState({value})
  }),
  exampleProps: {
    prefix: ['prefix', ''],
    suffix: ['suffix', '']
  },
  source: InputSource
});
