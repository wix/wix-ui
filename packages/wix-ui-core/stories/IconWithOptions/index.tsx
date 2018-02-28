import * as React from 'react';
import createStory from '../create-story';
import {IconWithOptions} from '../../src/components/IconWithOptions';
import * as IconWithOptionsSource from '!raw-loader!../../src/components/IconWithOptions/IconWithOptions.tsx';
import {OptionFactory} from '../../src/baseComponents/DropdownOption';

const dropdownOptions =
  Array.from(Array(20))
    .map((x, index) =>
      index === 5 ?
        OptionFactory.createDivider() :
        OptionFactory.create(index, index === 3, true, index === 15 ? 'fdsf sdf sdf sdf sdf sdfsd fsdf sdf ds' : `value${index}`));

export const story = () => createStory({
  category: 'Components',
  name: 'IconWithOptions',
  storyName: 'IconWithOptions',
  component: IconWithOptions,
  source: IconWithOptionsSource,
  componentProps: {
    'data-hook': 'storybook-iconwithoptions',
    options: dropdownOptions,
    inputProps: {},
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/caps-hats/512/Ladies_cap-128.png'
  }
});
