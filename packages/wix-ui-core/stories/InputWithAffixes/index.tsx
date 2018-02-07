import * as React from 'react';
import createStory from '../create-story';

import {InputWithAffixes} from '../../src/components/InputWithAffixes';
import * as InputSource from '!raw-loader!../../src/components/InputWithAffixes/index.tsx';

const prefix = <span>prefix</span>;
const suffix = <span>suffix</span>;

export const story = () => createStory({
  category: 'Components',
  name: 'InputWithAffixes',
  storyName: 'InputWithAffixes',
  component: InputWithAffixes,
  componentProps: (setState) => ({
    'data-hook': 'storybook-input-affix',
    value: '',
    onChange: ({target: {value}}) => setState({value}),
    prefix,
    suffix
  }),
  source: InputSource
});
