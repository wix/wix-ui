import * as React from 'react';
import createStory from '../create-story';
import {IconWithOptions} from '../../src/components/IconWithOptions';
import * as IconWithOptionsSource from '!raw-loader!../../src/components/IconWithOptions/IconWithOptions.tsx';
import {OptionFactory} from '../../src/baseComponents/DropdownOption';
import {generateOptions} from '../../src/baseComponents/DropdownOption/OptionsExample';

export const story = () => createStory({
  category: 'Components',
  name: 'IconWithOptions',
  storyName: 'IconWithOptions',
  component: IconWithOptions,
  source: IconWithOptionsSource,
  componentProps: {
    'data-hook': 'storybook-iconwithoptions',
    options: generateOptions(),
    inputProps: {},
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/caps-hats/512/Ladies_cap-128.png'
  }
});
